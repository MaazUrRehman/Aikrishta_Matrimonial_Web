import "./globals.css";
import Providers from "@/providers/Providers";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import IncomingVoiceCall from "@/components/user-profiles/IncomingVoiceCall";
import IncomingVideoCallModal from "@/components/user-profiles/IncomingVideoCallModal";

export const metadata = {
  title: "AIKRISHTA",
  description: "AIKRISHTA Matrimonial Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ProtectedRoute>
            <IncomingVoiceCall />
            {children}
          </ProtectedRoute>
          <IncomingVideoCallModal />

        </Providers>
      </body>
    </html>
  );
}