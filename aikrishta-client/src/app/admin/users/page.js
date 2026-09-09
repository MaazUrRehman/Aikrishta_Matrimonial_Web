// src/app/admin/users/page.js
import AdminUsersPage from './AdminUsersPage';

export const metadata = {
  title: 'User Management',
  description: 'Manage AIKRISHTA matchmaking platform users from the admin area.',
  robots: { index: false, follow: false },
  openGraph: { title: 'User Management | AIKRISHTA', description: 'Manage AIKRISHTA matchmaking platform users from the admin area.', type: 'website' },
  twitter: { card: 'summary', title: 'User Management | AIKRISHTA', description: 'Manage AIKRISHTA matchmaking platform users from the admin area.' },
};

export default function Page() {
  return <AdminUsersPage />;
}