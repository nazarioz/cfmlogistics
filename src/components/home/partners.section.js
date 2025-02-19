'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll, StaggerChildren } from '@/components/ui/reveal.animation';

// Importar logos
import appcLogo from '@/assets/icons/APPC.png';
import mophrLogo from '@/assets/icons/MOPHRH.png';
import fidicLogo from '@/assets/icons/FIDIC.png';
import ctaLogo from '@/assets/icons/CTA.png';

export default function PartnersSection() {
    const { t } = useTranslation();

    const partners = [
        {
            name: 'APPC',
            logo: appcLogo,
            href: 'https://www.appc.pt'
        },
        {
            name: 'MOPHRH',
            logo: mophrLogo,
            href: 'https://www.mophrh.gov.mz'
        },
        {
            name: 'FIDIC',
            logo: fidicLogo,
            href: 'https://fidic.org'
        },
        {
            name: 'CTA',
            logo: ctaLogo,
            href: 'https://www.cta.org.mz'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="container px-4 max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <RevealOnScroll>
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="h-[2px] w-8 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium">{t('home.partners.subtitle')}</span>
                            <div className="h-[2px] w-8 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] ">
                            {t('home.partners.title')}
                        </h2>
                    </div>
                </RevealOnScroll>

                {/* Grid de Parceiros */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StaggerChildren delay={0.15}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center py-8">
                            {partners.map((partner, index) => (
                                <RevealOnScroll key={index} direction="bottom" delay={index * 0.1}>
                                    <Link
                                        href={partner.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex justify-center items-center transition-all duration-500"
                                    >
                                        <div className="relative w-full h-24">
                                            <Image
                                                src={partner.logo}
                                                alt={`Logo ${partner.name}`}
                                                fill
                                                className="object-contain transition-all duration-500 
                                                         grayscale group-hover:grayscale-0 opacity-70 
                                                         group-hover:opacity-100 scale-95 group-hover:scale-100"
                                            />
                                        </div>
                                    </Link>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </StaggerChildren>
                </div>
            </div>
        </section>
    );
} 