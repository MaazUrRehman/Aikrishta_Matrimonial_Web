// src/components/chat/ChatFloatingPanel.js
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { API } from '@/lib/api';
import ChatWindow from './ChatWindow';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useSocket } from "@/context/SocketContext";

const ChatFloatingPanel = () => {
  const { isOpen, setIsOpen, activeConversation, setActiveConversation } = useChat();
  const { user, isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState([]);
  const socket = useSocket();

  console.log('User object:', user);



  useEffect(() => {
    if (!isOpen) return;


    const load = async () => {
      const res = await axiosInstance.get(API.chat.getConversations);
      setConversations(res.data.data);
    };

    load();

    socket?.on("message_sent", load);
    socket?.on("receive_message", load);

    return () => {
      socket?.off("message_sent", load);
      socket?.off("receive_message", load);
    };

  }, [isOpen, socket]);

  useEffect(() => {
    if (!isAuthenticated || !user || user.role === 'admin') {
      setIsOpen(false);
      setActiveConversation(null);
    }
  }, [isAuthenticated, user, setIsOpen, setActiveConversation]);



  return (
    <>
      {isAuthenticated && user && user.role !== 'admin' && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          style={styles.floatingButton}
        >
          <MessageCircle size={32} color={COLORS.textWhite} />
        </motion.button>
      )}

      <AnimatePresence>
        {isAuthenticated && user && user.role !== 'admin' && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={styles.chatPanel}
          >
            {activeConversation ? (
              <ChatWindow conversation={activeConversation} onClose={() => setActiveConversation(null)} />
            ) : (
              <div style={styles.conversationList}>
                <div style={styles.header}>
                  <h2 style={styles.headerTitle}>Messages</h2>
                  <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                    <X size={24} color={COLORS.textWhite} />
                  </button>
                </div>
                <div style={styles.conversationContainer}>
                  {conversations.length === 0 ? (
                    <div style={styles.emptyState}>
                      <p style={styles.emptyStateText}>No conversations yet</p>
                      <p style={styles.emptyStateSubText}>Start chatting with your matches!</p>
                    </div>
                  ) : (
                    conversations.map(conv => {
                      let otherUser = null;

                      if (user?._id) {
                        otherUser = conv.members.find(
                          member => member._id !== user._id
                        );
                      } else if (user?.id) {
                        otherUser = conv.members.find(
                          member => member._id !== user.id
                        );
                      } else if (user?.user?._id) {
                        otherUser = conv.members.find(
                          member => member._id !== user.user._id
                        );
                      } else if (user?.user?.id) {
                        otherUser = conv.members.find(
                          member => member._id !== user.user.id
                        );
                      } else {
                        const userId = user?._id || user?.id || user?.user?._id || user?.user?.id;
                        if (userId) {
                          otherUser = conv.members.find(
                            member => member._id !== userId
                          );
                        } else {
                          otherUser = conv.members[0];
                        }
                      }

                      return (
                        <div
                          key={conv._id}
                          style={styles.conversationItem}
                          onClick={() => setActiveConversation(conv)}
                        >
                          <div style={styles.avatar}>
                            <span style={styles.avatarText}>
                              {otherUser?.firstName?.charAt(0).toUpperCase() ||
                                otherUser?.fullName?.charAt(0).toUpperCase() ||
                                'U'}
                            </span>
                          </div>
                          <div style={styles.conversationInfo}>
                            <p style={styles.conversationName}>
                              {otherUser?.firstName || otherUser?.fullName || "Unknown User"}
                            </p>
                            <p style={styles.conversationLastMsg}>
                              {conv.lastMessage || 'Start conversation'}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <div style={styles.unreadBadge}>
                              {conv.unreadCount}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: SPACING[6],
    right: SPACING[6],
    width: '64px',
    height: '64px',
    background: COLORS.secondary,
    borderRadius: '50%',
    boxShadow: `0 8px 40px rgba(201, 169, 110, 0.4)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    zIndex: 99999,
    transition: 'all 0.3s ease',
  },
  chatPanel: {
    position: 'fixed',
    bottom: '100px',
    right: SPACING[6],
    width: '420px',
    height: '650px',
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
    boxShadow: SHADOWS['2xl'],
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.06)`,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 99998,
  },
  conversationList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    padding: SPACING[6],
    background: COLORS.secondary,
    color: COLORS.textWhite,
    boxShadow: SHADOWS.md,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    margin: 0,
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    cursor: 'pointer',
    padding: SPACING[2],
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      transform: 'rotate(90deg)',
    },
  },
  conversationContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: SPACING[4],
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  emptyStateText: {
    color: 'rgba(255,255,255,0.4)',
    marginBottom: SPACING[2],
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  emptyStateSubText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  conversationItem: {
    display: 'flex',
    alignItems: 'center',
    padding: SPACING[3],
    borderBottom: `1px solid rgba(255,255,255,0.04)`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: BORDER_RADIUS.lg,
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderColor: `${COLORS.accent}20`,
    },
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: COLORS.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING[4],
    flexShrink: 0,
  },
  avatarText: {
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  conversationInfo: {
    flex: 1,
    minWidth: 0,
  },
  conversationName: {
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    margin: 0,
    marginBottom: SPACING[0.5],
    truncate: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  conversationLastMsg: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.3)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    margin: 0,
    truncate: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  unreadBadge: {
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    borderRadius: BORDER_RADIUS.full,
    minWidth: '24px',
    textAlign: 'center',
    boxShadow: `0 4px 15px rgba(139, 30, 63, 0.3)`,
  },
};

export default ChatFloatingPanel;