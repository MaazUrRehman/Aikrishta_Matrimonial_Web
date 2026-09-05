// // src/components/admin/AdminDashboardPage.js
// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';
// import AdminDashboard from './adminDashboard';
// import { COLORS, SPACING } from '@/constants/theme';

// export default function AdminDashboardPage() {
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is logged in and is admin
//     const userData = localStorage.getItem('user');
//     if (!userData) {
//       router.push('/auth/login');
//       return;
//     }

//     try {
//       const user = JSON.parse(userData);
//       if (user.role !== 'admin' && !user.isAdmin) {
//         router.push('/');
//       }
//     } catch (error) {
//       router.push('/auth/login');
//     }
//   }, [router]);

//   return (
//     <div style={styles.pageWrapper}>
//       <Navbar />
//       <main style={styles.main}>
//         <div style={styles.container}>
//           <AdminDashboard />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// const styles = {
//   pageWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     backgroundColor: COLORS.backgroundLight,
//   },

//   main: {
//     flex: 1,
//     padding: `${SPACING[6]} 0`,
//   },

//   container: {
//     maxWidth: '1400px',
//     margin: '0 auto',
//     padding: `0 ${SPACING[6]}`,
//   },
// };











// src/components/admin/AdminDashboardPage.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AdminDashboard from './adminDashboard';
import { COLORS, SPACING } from '@/constants/theme';

export default function AdminDashboardPage() {
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

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.container}>
          <AdminDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
  },
  main: {
    flex: 1,
    padding: `${SPACING[6]} 0`,
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `0 ${SPACING[6]}`,
  },
};