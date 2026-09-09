export const metadata = {
  title: "Matrimonial Profile Details",
  description:
    "View detailed information about a potential life partner on AIKRISHTA.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Matrimonial Profile Details | AIKRISHTA",
    description: "View detailed information about a potential life partner on AIKRISHTA.",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Matrimonial Profile Details | AIKRISHTA",
    description: "View detailed information about a potential life partner on AIKRISHTA.",
  },
};

export default function ProfileDetailsLayout({ children }) {
  return children;
}