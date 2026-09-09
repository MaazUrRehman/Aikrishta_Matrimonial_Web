export const metadata = {
  title: "Matrimonial Dashboard",
  description:
    "Manage your AIKRISHTA matrimonial journey, discover matches, and explore meaningful connections.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Matrimonial Dashboard | AIKRISHTA",
    description: "Manage your AIKRISHTA matrimonial journey and discover meaningful connections.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Matrimonial Dashboard | AIKRISHTA",
    description: "Manage your AIKRISHTA matrimonial journey and discover meaningful connections.",
  },
};

export default function DashboardLayout({ children }) {
  return children;
}