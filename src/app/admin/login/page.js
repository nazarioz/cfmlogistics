import AdminLogin from '@/app/admin/login/login'

export const metadata = {
    title: 'Login | CFML',
    description: 'Login para a área administrativa',
    alternates: {
        canonical: '/admin/login',
    },
    openGraph: {
        title: 'Login | CFML',
        description: 'Login para a área administrativa',
        url: 'https://aemc.com.br/admin/login',
        siteName: 'CFML',
        images: '/logo.png',
    },
}

export default function AdminLoginPage() {
    return <AdminLogin />
}
