'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo/logo.png';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    const { t } = useTranslation();

    const companyLinks = [
        { label: t('nav.about'), href: '/quem-somos' },
        { label: t('nav.services'), href: '/servicos' },
        { label: t('nav.news'), href: '/publicacoes' },
        { label: t('nav.gallery'), href: '/galeria' },
    ];

    const servicesLinks = [
        { label: t('services.list.0.title'), href: '/servicos#servicos-mariticos' },
        { label: t('services.list.1.title'), href: '/servicos#servicos-armazenagem' },
        { label: t('services.list.2.title'), href: '/servicos#petroleo-gas' },
        { label: t('services.list.3.title'), href: '/servicos#servicos-projectos' },
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, href: 'https://facebook.com' },
        { icon: <FaLinkedinIn />, href: 'https://linkedin.com' },
        { icon: <FaInstagram />, href: 'https://instagram.com' },
    ];

    return (
        <footer className="bg-[#2f2f2f] text-white pt-16 pb-8">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
                    {/* Logo e Informações de Contacto */}
                    <div className="space-y-6">
                        <Link href="/" className="block">
                            <Image
                                src={logo}
                                alt="CFM LOGISTICS"
                                width={150}
                                height={50}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <div className="space-y-4 text-gray-300">
                            <p>Edifício Maputo Business Tower - Rua dos Desportistas, n.º 480, 6° andar</p>
                            <p>
                                <span className="block text-sm text-gray-400">{t('footer.phone')}</span>
                                (+258) 849704924 / (+258) 833022610
                            </p>
                            <p>
                                <span className="block text-sm text-gray-400">{t('footer.email')}</span>
                                cfmlogistics@logistics.cfm.co.mz
                            </p>
                        </div>
                    </div>

                    {/* Links da Empresa */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">{t('footer.company')}</h3>
                        <ul className="space-y-4">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links de Serviços */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">{t('footer.services')}</h3>
                        <ul className="space-y-4">
                            {servicesLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Redes Sociais */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">{t('footer.social')}</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                                             hover:bg-[#fc4c04] transition-colors duration-300"
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Linha Divisória */}
                <div className="h-[1px] bg-white/10 my-8" />

                {/* Copyright */}
                <div className="text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} CFM LOGISTICS. {t('footer.rights')}. Developed by <a href="https://www.linkedin.com/in/nazario-zandamela-49448622b/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#fc4c04] transition-colors duration-300">Nazário Zandamela</a></p>
                </div>
            </div>
        </footer>
    );
} 