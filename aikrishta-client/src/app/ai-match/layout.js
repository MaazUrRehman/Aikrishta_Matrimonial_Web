export const metadata = {
  title: "AI-Powered Matchmaking",
  description:
    "Discover compatible life partners with AI-powered matchmaking based on your preferences and values.",
  keywords: ["AI matchmaking", "compatible life partners", "matrimonial matches"],
  robots: { index: false, follow: false },
  openGraph: {
    title: "AI-Powered Matchmaking | AIKRISHTA",
    description: "Discover compatible life partners with AI-powered matchmaking.",
    type: "website",
    images: [{ url: "/images/ai-match-bg-hero-img.png", alt: "AI-powered matchmaking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Matchmaking | AIKRISHTA",
    description: "Discover compatible life partners with AI-powered matchmaking.",
    images: ["/images/ai-match-bg-hero-img.png"],
  },
};

export default function AIMatchLayout({ children }) {
  return children;
}