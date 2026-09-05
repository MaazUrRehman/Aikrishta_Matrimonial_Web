// aikrishta-client/src/components/common/ProtectedRoute.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    
    // Check if the user is attempting to access a protected route
    // Protected routes are those that are NOT under /auth/
    const isPublicRoute = pathname.startsWith('/auth/');
    
    if (!user && !isPublicRoute) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router, pathname]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
