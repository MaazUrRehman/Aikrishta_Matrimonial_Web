import "./globals.css";
import Script from "next/script";
import Providers from "@/providers/Providers";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import IncomingVoiceCall from "@/components/user-profiles/IncomingVoiceCall";
import IncomingVideoCallModal from "@/components/user-profiles/IncomingVideoCallModal";

export const metadata = {
  verification: {
    google: "hnaLNk2xQ8xxrlPoJLXayF-uzOkdG8uPi2UEelYPdmg",
  },
  title: {
    default: "AIKRISHTA | Find Your Perfect Life Partner",
    template: "%s | AIKRISHTA",
  },
  description:
    "AIKRISHTA is a trusted matrimonial platform that helps you find meaningful, compatible life partnerships.",
  keywords: [
    "AIKRISHTA",
    "matrimonial platform",
    "find a life partner",
    "compatible matches",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AIKRISHTA | Find Your Perfect Life Partner",
    description:
      "Find meaningful, compatible life partnerships with AIKRISHTA.",
    type: "website",
    images: [
      {
        url: "/images/aikrishta-logo.png",
        alt: "AIKRISHTA matrimonial platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIKRISHTA | Find Your Perfect Life Partner",
    description:
      "Find meaningful, compatible life partnerships with AIKRISHTA.",
    images: ["/images/aikrishta-logo.png"],
  },
  icons: {
    icon: "/images/aikrishta-logo-fav.png",
    shortcut: "/images/aikrishta-logo-fav.png",
    apple: "/images/aikrishta-logo-fav.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V3RR7N23DR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V3RR7N23DR');`}
        </Script>
      </body>
    </html>
  );
}
