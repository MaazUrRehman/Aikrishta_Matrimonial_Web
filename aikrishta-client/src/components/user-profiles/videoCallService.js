

// src/components/profile-detail/videoCallService.js

import axiosInstance from "@/lib/axios";
import { toast } from 'react-hot-toast';
import {
  connect,
  createLocalTracks,
} from "twilio-video";

// ==========================================
// GET VIDEO TOKEN
// ==========================================

export const getVideoToken = async (roomName) => {
  try {
    console.log("🎥 Requesting video token...");

    const response = await axiosInstance.post(
      "/twilio/video/token",
      {
        roomName,
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Video token error:", error);

    toast.error(
      error?.response?.data?.message ||
      error?.message ||
      "Unable to get video token"
    );
    return null;
  }
};

// ==========================================
// JOIN VIDEO ROOM - FIXED AUDIO
// ==========================================

export const joinVideoRoom = async (
  token,
  roomName,
  callbacks = {}
) => {
  try {
    console.log("🎥 Joining Twilio video room:", roomName);

    const {
      onLocalTrack,
      onRemoteTrack,
      onParticipantConnected,
      onParticipantDisconnected,
    } = callbacks;

    // ==========================================
    // CAMERA + MICROPHONE - Force audio enabled
    // ==========================================

    console.log("🎤 Requesting microphone access...");
    
    const localTracks = await createLocalTracks({
      audio: {
        enabled: true,
        name: 'microphone',
      },
      video: {
        enabled: true,
        name: 'camera',
        width: 640,
        height: 480,
        frameRate: 24,
      },
    });

    console.log("🎥 Local tracks created:");
    localTracks.forEach(t => {
      console.log(`  - ${t.kind}: ${t.isEnabled ? '✅ Enabled' : '❌ Disabled'}`);
    });

    // Ensure audio track is enabled
    const audioTrack = localTracks.find(t => t.kind === 'audio');
    if (audioTrack) {
      if (!audioTrack.isEnabled) {
        audioTrack.enable();
        console.log("🎤 Audio track enabled manually");
      }
      console.log("🎤 Audio track status:", audioTrack.isEnabled ? '✅ ON' : '❌ OFF');
    } else {
      console.error("❌ No audio track created!");
    }

    // ==========================================
    // CONNECT TO TWILIO ROOM
    // ==========================================

    const room = await connect(token, {
      name: roomName,
      tracks: localTracks,
    });

    console.log("✅ Joined video room:", room.name);
    console.log("🔊 Room audio enabled:", room.isAudioEnabled);

    // ==========================================
    // LOCAL TRACKS - Send to parent
    // ==========================================

    localTracks.forEach((track) => {
      console.log(`🎥 Sending local ${track.kind} track to parent`);
      if (onLocalTrack) {
        onLocalTrack(track);
      }
    });

    // ==========================================
    // HANDLE PARTICIPANT - PROPER AUDIO
    // ==========================================

    const setupParticipant = (participant) => {
      console.log(`👤 Setting up participant: ${participant.identity}`);

      if (onParticipantConnected) {
        onParticipantConnected(participant);
      }

      // Handle existing tracks
      participant.tracks.forEach((publication) => {
        if (publication.isSubscribed && publication.track) {
          console.log(
            `🎥 Existing remote track: ${publication.track.kind}`
          );

          // 🔥 IMPORTANT: For audio tracks, we need to attach them
          if (publication.track.kind === 'audio') {
            console.log("🔊 Remote audio track found!");
            // Attach audio to create an audio element
            const audioElement = publication.track.attach();
            audioElement.style.display = 'none'; // Hide the audio element
            document.body.appendChild(audioElement);
            console.log("🔊 Remote audio element attached to body");
          }

          if (onRemoteTrack) {
            onRemoteTrack(publication.track, participant);
          }
        }
      });

      // Handle new tracks
      participant.on("trackSubscribed", (track) => {
        console.log(`🎥 Remote track subscribed: ${track.kind}`);

        // 🔥 IMPORTANT: For audio tracks, attach them
        if (track.kind === 'audio') {
          console.log("🔊 New remote audio track subscribed!");
          const audioElement = track.attach();
          audioElement.style.display = 'none';
          document.body.appendChild(audioElement);
          console.log("🔊 New remote audio element attached");
        }

        if (onRemoteTrack) {
          onRemoteTrack(track, participant);
        }
      });

      participant.on("trackUnsubscribed", (track) => {
        console.log(`🎥 Remote track unsubscribed: ${track.kind}`);
      });
    };

    // ==========================================
    // EXISTING PARTICIPANTS
    // ==========================================

    room.participants.forEach((participant) => {
      setupParticipant(participant);
    });

    // ==========================================
    // NEW PARTICIPANT
    // ==========================================

    room.on("participantConnected", (participant) => {
      console.log(`👤 Participant connected: ${participant.identity}`);
      setupParticipant(participant);
    });

    // ==========================================
    // PARTICIPANT DISCONNECTED
    // ==========================================

    room.on("participantDisconnected", (participant) => {
      console.log(`👋 Participant disconnected: ${participant.identity}`);
      if (onParticipantDisconnected) {
        onParticipantDisconnected(participant);
      }
    });

    // ==========================================
    // ROOM DISCONNECTED
    // ==========================================

    room.on("disconnected", () => {
      console.log("📴 Room disconnected");
      
      localTracks.forEach(track => {
        try {
          track.stop();
          track.detach();
        } catch (e) {}
      });
    });

    return room;

  } catch (error) {
    console.error("❌ Failed to join video room:", error);
    toast.error(error.message || "Failed to join video room");
    return null;
  }
};

// ==========================================
// LEAVE VIDEO ROOM
// ==========================================

export const leaveVideoRoom = (room) => {
  if (!room) {
    return;
  }

  console.log("📴 Leaving video room:", room.name);

  // Stop all local tracks
  room.localParticipant.tracks.forEach((publication) => {
    const track = publication.track;
    if (track) {
      try {
        track.stop();
        track.detach().forEach((element) => {
          if (element && element.remove) {
            element.remove();
          }
        });
      } catch (e) {
        console.warn("Error cleaning track:", e);
      }
    }
  });

  room.disconnect();
  console.log("✅ Video room disconnected");
};
