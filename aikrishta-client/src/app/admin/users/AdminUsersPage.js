// src/app/admin/users/AdminUsersPage.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminUsersList from './AdminUsersList';

export default function AdminUsersPage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    try {
      const user = JSON.parse(userData);
      if (user.role !== 'admin' && !user.isAdmin) {
        router.push('/');
      }
    } catch (error) {
      router.push('/auth/login');
    }
  }, [router]);

  return <AdminUsersList />;
}