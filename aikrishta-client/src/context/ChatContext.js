// import { createContext, useContext, useState } from 'react';
// import axiosInstance from '@/lib/axios';
// import { API } from '@/lib/api';

// const ChatContext = createContext(null);

// export const ChatProvider = ({ children }) => {
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const openConversation = async (receiverId) => {
//     const res = await axiosInstance.post(API.chat.createConversation, { receiverId });
//     setActiveConversation(res.data.data);
//     setIsOpen(true);
//   };

//   return (
//     <ChatContext.Provider value={{ activeConversation, setActiveConversation, isOpen, setIsOpen, openConversation }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => useContext(ChatContext);







import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { API } from '@/lib/api';
import { useSocket } from './SocketContext';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const socket = useSocket();

  const openConversation = async (receiverId) => {
    try {
      const res = await axiosInstance.post(API.chat.createConversation, { receiverId });
      setActiveConversation(res.data.data);
      setIsOpen(true);
    } catch (error) {
      console.error('Error opening conversation:', error);
    }
  };

  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on('new_message', (msg) => {
        if (activeConversation && msg.conversationId === activeConversation._id) {
          // Update active conversation with new message
        }
      });

      return () => {
        socket.off('new_message');
      };
    }
  }, [socket, activeConversation]);

  return (
    <ChatContext.Provider 
      value={{ 
        activeConversation, 
        setActiveConversation, 
        isOpen, 
        setIsOpen, 
        openConversation 
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);