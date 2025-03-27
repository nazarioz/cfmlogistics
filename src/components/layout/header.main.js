'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo/logo.png';
import { FaChevronDown } from 'react-icons/fa';

export default function Header() {
    const { t, i18n } = useTranslation();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownTimeoutRef = useRef(null);
    const dropdownRefs = useRef({});

    const navigationItems = [
        {
            label: 'CFM Logistics',
            id: 'cfm-logistics',
            dropdown: [
                { label: t('about.menu.who'), href: '/quem-somos' },
                { label: t('about.menu.origin'), href: '/quem-somos#origem' },
                { label: t('about.menu.mission'), href: '/quem-somos#missao-visao' },
                { label: t('about.menu.objectives'), href: '/quem-somos#objetivos' },
                { label: t('about.menu.timeline'), href: '/quem-somos#timeline' },
                { label: t('about.menu.structure'), href: '/quem-somos#organograma' },
            ],
        },
        { label: t('nav.services'), href: '/servicos' },
        { label: t('nav.news'), href: '/publicacoes' },
        { label: t('nav.gallery'), href: '/galeria' },
        { label: t('nav.contact'), href: '/contactos' },
    ];

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pt' : 'en';
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (!Object.values(dropdownRefs.current).some(ref => ref.contains(event.target))) {
                setOpenDropdown(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMouseEnter = (dropdownId) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(dropdownId);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    return (
        <header className="bg-white shadow-md py-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src={logo}
                                alt="CFM LOGISTICS Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <div key={item.id || item.href} className="relative">
                                {item.dropdown ? (
                                    <div
                                        ref={el => dropdownRefs.current[item.id] = el}
                                        className="relative"
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button className="inline-flex items-center text-gray-700 hover:text-[#646464] px-3 py-2 rounded-md text-sm font-medium">
                                            {item.label}
                                            <FaChevronDown 
                                                className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                                                    openDropdown === item.id ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        {openDropdown === item.id && (
                                            <div className="absolute z-10 -ml-4 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div className="py-1" role="menu">
                                                    {item.dropdown.map((dropdownItem, dropIndex) => (
                                                        <Link
                                                            key={dropIndex}
                                                            href={dropdownItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#646464]"
                                                        >
                                                            {dropdownItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-gray-700 hover:text-[#646464] px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#646464] hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Abrir menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>

                    {/* Adicionar botão de idioma */}
                    <button
                        onClick={toggleLanguage}
                        className="ml-4 px-3 py-1 rounded-md text-sm font-medium
                                 bg-[#fc4c04]/10 text-[#fc4c04] hover:bg-[#fc4c04]/20
                                 transition-colors duration-300"
                    >
                        {i18n.language === 'en' ? 'PT' : 'EN'}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                    {navigationItems.map((item, index) => (
                        <div key={index}>
                            {item.dropdown ? (
                                <button
                                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-[#646464] hover:bg-gray-50 rounded-md"
                                    onClick={() => setOpenDropdown(item.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        {item.label}
                                        <FaChevronDown
                                            className={`transition-transform duration-200 ${
                                                openDropdown === item.id ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#646464] hover:bg-gray-50 rounded-md"
                                >
                                    {item.label}
                                </Link>
                            )}

                            {/* Mobile dropdown */}
                            {item.dropdown && (
                                <div
                                    className={`transition-all duration-200 ${
                                        openDropdown === item.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}
                                >
                                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                        <Link
                                            key={dropdownIndex}
                                            href={dropdownItem.href}
                                            className="block pl-6 pr-3 py-2 text-sm text-gray-600 hover:text-[#646464] hover:bg-gray-50"
                                        >
                                            {dropdownItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}
