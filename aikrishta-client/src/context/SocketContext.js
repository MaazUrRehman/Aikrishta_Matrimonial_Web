// import { createContext, useContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const SocketContext = createContext(null);

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userStr = localStorage.getItem('user');
    
//     console.log('SocketProvider - Token exists:', !!token);
//     console.log('SocketProvider - Token length:', token?.length);

//     if (!token || !userStr) {
//       console.log('No token or user found');
//       return;
//     }

//     let cleanToken = token;
//     if (typeof cleanToken === 'string') {
//       cleanToken = cleanToken.replace(/^"|"$/g, '').trim();
//     }
    
//     console.log('Clean token length:', cleanToken?.length);

//     const newSocket = io('http://localhost:5000', {
//       auth: { 
//         token: cleanToken,
//         accessToken: cleanToken 
//       },
//       transports: ['polling', 'websocket'],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       timeout: 20000,
//     });

//     newSocket.on('connect', () => {
//       console.log('✅ Socket Connected:', newSocket.id);
//     });

//     newSocket.on('connect_error', (err) => {
//       console.log('❌ Socket Error:', err.message);
//     });

//     newSocket.on('receive_message', (data) => {
//       console.log('📩 New message received:', data);
//     });

//     setSocket(newSocket);
//     return () => {
//       console.log('Cleaning up socket');
//       newSocket.close();
//     };
//   }, []);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };

// export const useSocket = () => useContext(SocketContext);









import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    console.log('SocketProvider - Token exists:', !!token);
    console.log('SocketProvider - Token length:', token?.length);

    if (!token || !userStr) {
      console.log('No token or user found');
      return;
    }

    let cleanToken = token;

    if (typeof cleanToken === 'string') {
      cleanToken = cleanToken.replace(/^"|"$/g, '').trim();
    }

    console.log('Clean token length:', cleanToken?.length);

    const newSocket = io('http://localhost:5000', {
      auth: {
        token: cleanToken,
        accessToken: cleanToken,
      },
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      timeout: 20000,
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket Connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('🔴 Socket Disconnected');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (err) => {
      console.log('❌ Socket Error:', err.message);
      setIsConnected(false);
    });

    newSocket.on('receive_message', (data) => {
      console.log('📩 New message received:', data);
    });

    setSocket(newSocket);

    return () => {
      console.log('Cleaning up socket');

      newSocket.close();
      setIsConnected(false);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={socket}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);