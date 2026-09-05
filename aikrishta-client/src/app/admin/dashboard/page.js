// src/app/admin/dashboard/page.js
import AdminDashboardPage from './AdminDashboardPage';  // ✅ Relative import

export const metadata = {
  title: 'Admin Dashboard | AIKRISHTA',
  description: 'Admin dashboard for AIKRISHTA matchmaking platform',
};

export default function Page() {
  return <AdminDashboardPage />;
}