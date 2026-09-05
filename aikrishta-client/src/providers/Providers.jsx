"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import { ChatProvider } from "@/context/ChatContext";
import ChatFloatingPanel from "@/components/common/ChatFloatingPanel";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>
          <ChatProvider>
            {children}
            <ChatFloatingPanel />
          </ChatProvider>
        </SocketProvider>
      </AuthProvider>
      <Toaster position="top-right" />
    </Provider>
  );
}