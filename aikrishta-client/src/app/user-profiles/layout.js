export const metadata = {
  title: "Browse Matrimonial Profiles",
  description:
    "Browse compatible, verified matrimonial profiles and discover potential life partners on AIKRISHTA.",
  keywords: ["browse matrimonial profiles", "verified profiles", "life partners"],
  robots: { index: false, follow: false },
  openGraph: {
    title: "Browse Matrimonial Profiles | AIKRISHTA",
    description: "Browse compatible, verified matrimonial profiles on AIKRISHTA.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Browse Matrimonial Profiles | AIKRISHTA",
    description: "Browse compatible, verified matrimonial profiles on AIKRISHTA.",
  },
};

export default function UserProfilesLayout({ children }) {
  return children;
}