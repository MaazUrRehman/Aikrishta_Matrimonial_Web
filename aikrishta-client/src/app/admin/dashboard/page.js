// src/app/admin/dashboard/page.js
import AdminDashboardPage from './AdminDashboardPage';  // ✅ Relative import

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage the AIKRISHTA matchmaking platform from the admin dashboard.',
  robots: { index: false, follow: false },
  openGraph: { title: 'Admin Dashboard | AIKRISHTA', description: 'Manage the AIKRISHTA matchmaking platform from the admin dashboard.', type: 'website' },
  twitter: { card: 'summary', title: 'Admin Dashboard | AIKRISHTA', description: 'Manage the AIKRISHTA matchmaking platform from the admin dashboard.' },
};

export default function Page() {
  return <AdminDashboardPage />;
}