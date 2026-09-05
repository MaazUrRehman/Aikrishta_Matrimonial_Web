
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useSocket } from '@/context/SocketContext';
// import { useAuth } from '@/hooks/useAuth';
// import { motion } from 'framer-motion';
// import { Send, Smile, Mic, ChevronLeft, Check, CheckCheck, MessageCircle } from 'lucide-react';
// import axiosInstance from '@/lib/axios';
// import { API } from '@/lib/api';
// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
// import io from 'socket.io-client';

// const MessageBubble = ({ message, isOwn }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 5 }}
//     animate={{ opacity: 1, y: 0 }}
//     style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: isOwn ? 'flex-end' : 'flex-start',
//       marginBottom: SPACING[3],
//     }}
//   >
//     <div style={{
//       padding: SPACING[3],
//       borderRadius: BORDER_RADIUS['2xl'],
//       maxWidth: '80%',
//       backgroundColor: isOwn ? COLORS.primary : COLORS.gray100,
//       color: isOwn ? COLORS.textWhite : COLORS.textDark,
//     }}>
//       <p style={{
//         fontSize: TYPOGRAPHY.fontSize.sm,
//         whiteSpace: 'pre-wrap',
//         wordBreak: 'break-word',
//         fontFamily: TYPOGRAPHY.fontFamily.body,
//         margin: 0,
//       }}>
//         {message.text}
//       </p>
//       <div style={{
//         fontSize: '10px',
//         marginTop: SPACING[1],
//         opacity: 0.7,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         gap: SPACING[1],
//       }}>
//         {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         {isOwn && (message.seen ? <CheckCheck size={12} /> : <Check size={12} />)}
//       </div>
//     </div>
//   </motion.div>
// );

// const ChatWindow = ({ conversation, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const contextSocket = useSocket();
//   const { user } = useAuth();
//   const scrollRef = useRef(null);
//   const textareaRef = useRef(null);

//   // Create local socket if context socket is null
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // If context socket exists, use it
//     if (contextSocket) {
//       console.log('Using context socket');
//       setSocket(contextSocket);
//       return;
//     }

//     // Otherwise create local socket
//     console.log('Creating local socket');
//     const token = localStorage.getItem('token');
//     let cleanToken = token;
//     if (cleanToken && cleanToken.startsWith('"') && cleanToken.endsWith('"')) {
//       cleanToken = cleanToken.slice(1, -1);
//     }
//     cleanToken = cleanToken?.trim();

//     if (cleanToken) {
//       const newSocket = io('http://localhost:5000', {
//         auth: { token: cleanToken },
//         transports: ['websocket'],
//         reconnection: true,
//       });

//       newSocket.on('connect', () => {
//         console.log('✅ Local Socket Connected:', newSocket.id);
//       });

//       newSocket.on('connect_error', (err) => {
//         console.log('❌ Local Socket Error:', err.message);
//       });

//       setSocket(newSocket);
//       return () => {
//         newSocket.close();
//       };
//     }
//   }, [contextSocket]);

//   const fetchMessages = useCallback(async () => {
//     if (!conversation?._id) return;
//     try {
//       const res = await axiosInstance.get(API.chat.getMessages(conversation._id));
//       setMessages(res.data.data || []);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   }, [conversation?._id]);

//   useEffect(() => {
//     if (!socket || !conversation?._id) return;

//     fetchMessages();

//     const handleReceive = (msg) => {
//       console.log("📩 Received:", msg);
//       if (msg.conversationId === conversation._id) {
//         setMessages(prev => [...prev, msg]);
//         setTimeout(() => {
//           if (scrollRef.current) {
//             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//           }
//         }, 100);
//       }
//     };

//     socket.on('receive_message', handleReceive);

//     return () => socket.off('receive_message', handleReceive);
//   }, [conversation?._id, socket, fetchMessages]);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = async (e) => {
//     if (e) e.preventDefault();
//     const trimmedText = text.trim();

//     // Get user from localStorage
//     const userStr = localStorage.getItem('user');
//     const currentUser = userStr ? JSON.parse(userStr) : null;
//     const userId = currentUser?.id;

//     console.log('SEND MESSAGE:');
//     console.log('socket:', socket);
//     console.log('socket connected:', socket?.connected);
//     console.log('userId:', userId);

//     if (!trimmedText || !socket || !socket.connected || !conversation?._id || !userId) {
//       console.log('Cannot send - missing required');
//       return;
//     }

//     try {
//       console.log("==================================");
//       console.log("Current User ID:", userId);
//       console.log("Conversation:", conversation);
//       console.log("Members:", conversation.members);

//       conversation.members.forEach((m, index) => {
//         console.log(`Member ${index}:`, m);
//       });

//       const receiver = conversation.members.find(m => m._id !== userId);


//       console.log("Receiver:", receiver);

//       // const receiverId = receiver?._id;
//       const receiverId = conversation.members.find(
//         memberId => memberId !== userId
//       );

//       console.log("ReceiverId:", receiverId);
//       console.log("==================================");

//       console.log('Receiver:', receiver);

//       if (!receiverId) {
//         console.error('No receiver found');
//         return;
//       }

//       socket.emit('send_message', {
//         conversationId: conversation._id,
//         receiverId: receiverId,
//         text: trimmedText
//       });

//       // const tempMessage = {
//       //   _id: `temp_${Date.now()}`,
//       //   text: trimmedText,
//       //   senderId: userId,
//       //   createdAt: new Date().toISOString(),
//       //   seen: false
//       // };
//       // setMessages(prev => [...prev, tempMessage]);
//       setText('');

//       if (textareaRef.current) {
//         textareaRef.current.style.height = 'auto';
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage(e);
//     }
//   };

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//     e.target.style.height = 'auto';
//     e.target.style.height = e.target.scrollHeight + 'px';
//   };


//   // const currentUserId = user?.id || JSON.parse(localStorage.getItem("user"))?.id;

//   // const currentUserId =
//   //   (user?._id || user?.id || JSON.parse(localStorage.getItem("user"))?.id)?.toString();

//   // const otherUser = conversation?.members?.find(
//   //   (m) => (m._id || m).toString() !== currentUserId
//   // );

//   const currentUserId = (
//     user?._id ||
//     user?.id ||
//     JSON.parse(localStorage.getItem("user"))?.id
//   )?.toString();

//   const otherUser = conversation?.members?.find((m) => {
//     const memberId = (m?._id || m)?.toString();
//     return memberId !== currentUserId;
//   });

//   console.log("Current User:", currentUserId);
//   console.log("Other User:", otherUser);

//   // const otherUser = conversation?.members?.find(
//   //   (m) => (m._id || m).toString() !== currentUserId
//   // );


//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <button onClick={onClose} style={styles.backBtn}>
//           <ChevronLeft size={24} color={COLORS.textGray} />
//         </button>
//         <div style={styles.headerInfo}>
//           {/* <p style={styles.headerTitle}>Chat</p>
//           <p style={styles.headerSub}>Conversation {conversation?._id?.slice(-6) || ''}</p> */}

//           {/* <p style={styles.headerTitle}>
//             {otherUser?.fullName || "User"}
//           </p>

//           <p style={styles.headerSub}>
//             {otherUser?.email || ""}
//           </p> */}

//           <p style={styles.headerTitle}>
//             {otherUser?.fullName || otherUser?.firstName || "User"}
//           </p>

//           <p style={styles.headerSub}>
//             {otherUser?.email || ""}
//           </p>
//         </div>
//       </div>

//       <div style={styles.messagesContainer} ref={scrollRef}>
//         {messages.length === 0 ? (
//           <div style={styles.emptyState}>
//             <div style={styles.emptyIcon}>
//               <MessageCircle size={32} color={COLORS.textGray} />
//             </div>
//             <p style={styles.emptyText}>No messages yet</p>
//             <p style={styles.emptySubText}>Start the conversation!</p>
//           </div>
//         ) : (
//           messages.map((m, index) => (
//             <MessageBubble
//               key={m._id || index}
//               message={m}
//               isOwn={m.senderId === user?.id}
//             />
//           ))
//         )}
//       </div>

//       <form onSubmit={sendMessage} style={styles.inputForm}>
//         <div style={styles.inputContainer}>
          
//           <textarea
//             ref={textareaRef}
//             style={styles.textarea}
//             rows={1}
//             value={text}
//             onChange={handleTextChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Type a message..."
//           />
//           <button
//             type="submit"
//             style={{
//               ...styles.sendBtn,
//               backgroundColor: text.trim() ? COLORS.primary : COLORS.gray200,
//               cursor: text.trim() ? 'pointer' : 'not-allowed',
//             }}
//             disabled={!text.trim()}
//           >
//             <Send size={20} color={text.trim() ? COLORS.textWhite : COLORS.textGray} />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     padding: SPACING[4],
//     borderBottom: `1px solid ${COLORS.borderLight}`,
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[3],
//     backgroundColor: COLORS.gray50,
//     boxShadow: SHADOWS.sm,
//   },
//   backBtn: {
//     background: 'transparent',
//     border: 'none',
//     cursor: 'pointer',
//     padding: SPACING[2],
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.3s ease',
//   },
//   headerInfo: {
//     flex: 1,
//   },
//   headerTitle: {
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     margin: 0,
//   },
//   headerSub: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textGray,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     margin: 0,
//   },
//   messagesContainer: {
//     flex: 1,
//     padding: SPACING[4],
//     overflowY: 'auto',
//     backgroundColor: COLORS.gray50,
//   },
//   emptyState: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//     textAlign: 'center',
//   },
//   emptyIcon: {
//     width: '64px',
//     height: '64px',
//     borderRadius: '50%',
//     backgroundColor: COLORS.gray200,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: SPACING[4],
//   },
//   emptyText: {
//     color: COLORS.textGray,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     margin: 0,
//     marginBottom: SPACING[1],
//   },
//   emptySubText: {
//     color: COLORS.textLight,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     margin: 0,
//   },
//   inputForm: {
//     padding: SPACING[3],
//     borderTop: `1px solid ${COLORS.borderLight}`,
//     backgroundColor: COLORS.white,
//   },
//   inputContainer: {
//     display: 'flex',
//     alignItems: 'flex-end',
//     gap: SPACING[2],
//     backgroundColor: COLORS.gray50,
//     borderRadius: BORDER_RADIUS.xl,
//     padding: SPACING[1],
//     border: `1px solid ${COLORS.borderLight}`,
//   },
//   iconBtn: {
//     background: 'transparent',
//     border: 'none',
//     cursor: 'pointer',
//     padding: SPACING[2],
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.3s ease',
//   },
//   textarea: {
//     flex: 1,
//     background: 'transparent',
//     padding: `${SPACING[2]} ${SPACING[2]}`,
//     border: 'none',
//     resize: 'none',
//     outline: 'none',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     maxHeight: '120px',
//     minHeight: '40px',
//     color: COLORS.textDark,
//   },
//   sendBtn: {
//     padding: SPACING[2],
//     borderRadius: '50%',
//     border: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.3s ease',
//   },
// };

// export default ChatWindow;



























// src/components/chat/ChatWindow.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Send, Smile, Mic, ChevronLeft, Check, CheckCheck, MessageCircle } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { API } from '@/lib/api';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import io from 'socket.io-client';

const MessageBubble = ({ message, isOwn }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isOwn ? 'flex-end' : 'flex-start',
      marginBottom: SPACING[3],
    }}
  >
    <div style={{
      padding: `${SPACING[3]} ${SPACING[4]}`,
      borderRadius: BORDER_RADIUS['2xl'],
      maxWidth: '80%',
      backgroundColor: 'rgba(255,255,255,0.04)',
color: isOwn ? COLORS.accent : COLORS.textWhite, // ✅ Golden bg, Blue text
      border: isOwn ? 'none' : `1px solid rgba(255,255,255,0.04)`,
      backdropFilter: isOwn ? 'none' : 'blur(10px)',
    }}>
      <p style={{
        fontSize: TYPOGRAPHY.fontSize.sm,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: TYPOGRAPHY.fontFamily.body,
        margin: 0,
      }}>
        {message.text}
      </p>
      <div style={{
        fontSize: '10px',
        marginTop: SPACING[1],
        opacity: 0.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: SPACING[1],
        color: isOwn ? COLORS.accent : 'rgba(255,255,255,0.5)',
      }}>
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        {isOwn && (message.seen ? <CheckCheck size={12} /> : <Check size={12} />)}
      </div>
    </div>
  </motion.div>
);

const ChatWindow = ({ conversation, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const contextSocket = useSocket();
  const { user } = useAuth();
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (contextSocket) {
      console.log('Using context socket');
      setSocket(contextSocket);
      return;
    }

    console.log('Creating local socket');
    const token = localStorage.getItem('token');
    let cleanToken = token;
    if (cleanToken && cleanToken.startsWith('"') && cleanToken.endsWith('"')) {
      cleanToken = cleanToken.slice(1, -1);
    }
    cleanToken = cleanToken?.trim();

    if (cleanToken) {
      const newSocket = io('http://localhost:5000', {
        auth: { token: cleanToken },
        transports: ['websocket'],
        reconnection: true,
      });

      newSocket.on('connect', () => {
        console.log('✅ Local Socket Connected:', newSocket.id);
      });

      newSocket.on('connect_error', (err) => {
        console.log('❌ Local Socket Error:', err.message);
      });

      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    }
  }, [contextSocket]);

  const fetchMessages = useCallback(async () => {
    if (!conversation?._id) return;
    try {
      const res = await axiosInstance.get(API.chat.getMessages(conversation._id));
      setMessages(res.data.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [conversation?._id]);

  useEffect(() => {
    if (!socket || !conversation?._id) return;

    fetchMessages();

    const handleReceive = (msg) => {
      console.log("📩 Received:", msg);
      if (msg.conversationId === conversation._id) {
        setMessages(prev => [...prev, msg]);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 100);
      }
    };

    socket.on('receive_message', handleReceive);

    return () => socket.off('receive_message', handleReceive);
  }, [conversation?._id, socket, fetchMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    const trimmedText = text.trim();

    const userStr = localStorage.getItem('user');
    const currentUser = userStr ? JSON.parse(userStr) : null;
    const userId = currentUser?.id;

    console.log('SEND MESSAGE:');
    console.log('socket:', socket);
    console.log('socket connected:', socket?.connected);
    console.log('userId:', userId);

    if (!trimmedText || !socket || !socket.connected || !conversation?._id || !userId) {
      console.log('Cannot send - missing required');
      return;
    }

    try {
      console.log("==================================");
      console.log("Current User ID:", userId);
      console.log("Conversation:", conversation);
      console.log("Members:", conversation.members);

      conversation.members.forEach((m, index) => {
        console.log(`Member ${index}:`, m);
      });

      const receiverId = conversation.members.find(
        memberId => memberId !== userId
      );

      console.log("ReceiverId:", receiverId);
      console.log("==================================");

      if (!receiverId) {
        console.error('No receiver found');
        return;
      }

      socket.emit('send_message', {
        conversationId: conversation._id,
        receiverId: receiverId,
        text: trimmedText
      });

      setText('');

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const currentUserId = (
    user?._id ||
    user?.id ||
    JSON.parse(localStorage.getItem("user"))?.id
  )?.toString();

  const otherUser = conversation?.members?.find((m) => {
    const memberId = (m?._id || m)?.toString();
    return memberId !== currentUserId;
  });

  console.log("Current User:", currentUserId);
  console.log("Other User:", otherUser);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onClose} style={styles.backBtn}>
          <ChevronLeft size={24} color="rgba(255,255,255,0.6)" />
        </button>
        <div style={styles.headerInfo}>
          <p style={styles.headerTitle}>
            {otherUser?.fullName || otherUser?.firstName || "User"}
          </p>
          <p style={styles.headerSub}>
            {otherUser?.email || ""}
          </p>
        </div>
      </div>

      <div style={styles.messagesContainer} ref={scrollRef}>
        {messages.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <MessageCircle size={32} color="rgba(255,255,255,0.2)" />
            </div>
            <p style={styles.emptyText}>No messages yet</p>
            <p style={styles.emptySubText}>Start the conversation!</p>
          </div>
        ) : (
          messages.map((m, index) => (
            <MessageBubble
              key={m._id || index}
              message={m}
              isOwn={m.senderId === user?.id}
            />
          ))
        )}
      </div>

      <form onSubmit={sendMessage} style={styles.inputForm}>
        <div style={styles.inputContainer}>
          <textarea
            ref={textareaRef}
            style={styles.textarea}
            rows={1}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button
            type="submit"
            style={{
              ...styles.sendBtn,
              backgroundColor: text.trim() ? COLORS.accent : 'rgba(255,255,255,0.05)',
              cursor: text.trim() ? 'pointer' : 'not-allowed',
            }}
            disabled={!text.trim()}
          >
            <Send size={20} color={text.trim() ? COLORS.primary : 'rgba(255,255,255,0.2)'} />
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
  },
  header: {
    padding: SPACING[4],
    borderBottom: `1px solid rgba(255,255,255,0.06)`,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    backgroundColor: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(10px)',
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: SPACING[2],
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    margin: 0,
  },
  headerSub: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    margin: 0,
  },
  messagesContainer: {
    flex: 1,
    padding: SPACING[4],
    overflowY: 'auto',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING[4],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.4)',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    margin: 0,
    marginBottom: SPACING[1],
  },
  emptySubText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    margin: 0,
  },
  inputForm: {
    padding: SPACING[3],
    borderTop: `1px solid rgba(255,255,255,0.06)`,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: SPACING[2],
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[1],
    border: `1px solid rgba(255,255,255,0.06)`,
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    padding: `${SPACING[2]} ${SPACING[2]}`,
    border: 'none',
    resize: 'none',
    outline: 'none',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    maxHeight: '120px',
    minHeight: '40px',
    color: COLORS.textWhite,
    '::placeholder': {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  sendBtn: {
    padding: SPACING[2],
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
};

export default ChatWindow;