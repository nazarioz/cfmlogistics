'use client';
import './globals.css'
import MainLayout from '@/components/layout/main.layout'
import AdminLayout from '@/components/layout/admin.layout'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()

  const renderLayout = () => {
    // If it's the admin login page, return only children
    if(pathname === '/admin/login') {
      return children;
    }
    // If it's other admin pages, use AdminLayout
    if(pathname?.includes('/admin')) {
      return <AdminLayout>{children}</AdminLayout>;
    }
    // For all other pages, use MainLayout
    return <MainLayout>{children}</MainLayout>;
  }

  return (
    <html lang="en">
      <body>
        {renderLayout()}
      </body>
    </html>
  )
}
