export const metadata = {
  title: "Privacy, Terms, Safety and FAQs",
  description:
    "Read AIKRISHTA privacy policy, terms of use, safety guidance, and frequently asked questions.",
  keywords: ["AIKRISHTA privacy policy", "matrimonial terms", "online matchmaking safety"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy, Terms, Safety and FAQs | AIKRISHTA",
    description: "Read AIKRISHTA privacy, terms, safety, and FAQ information.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy, Terms, Safety and FAQs | AIKRISHTA",
    description: "Read AIKRISHTA privacy, terms, safety, and FAQ information.",
  },
};

export default function LegalLayout({ children }) {
  return children;
}