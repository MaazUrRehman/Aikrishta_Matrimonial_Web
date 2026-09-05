// src/app/admin/verifications/[userId]/page.js
'use client';

import { useParams } from 'next/navigation';
import AdminVerificationDetail from '../AdminVerificationDetail';

export default function AdminVerificationDetailPage() {
  const params = useParams();
  return <AdminVerificationDetail userId={params.userId} />;
}