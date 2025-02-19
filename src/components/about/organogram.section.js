'use client';
import Image from 'next/image';
import { RevealOnScroll, StaggerChildren } from '@/components/ui/reveal.animation';

// Importar logos
import atelierLogo from '@/assets/logo/atelier.png';
import tecnicaLogo from '@/assets/logo/tecnica.png';
import verdeAzulLogo from '@/assets/logo/verde.png';

export default function Organogram() {
    const positions = [
        {
            logo: atelierLogo,
            company: 'Atelier',
            role: 'Vice-Presidente',
            bgColor: 'bg-gray-700'
        },
        {
            logo: tecnicaLogo,
            company: 'Técnica Engenheiros Associados',
            role: 'Presidente',
            bgColor: 'bg-[#D62028]'
        },
        {
            logo: verdeAzulLogo,
            company: 'Verde Azul',
            role: 'Vice-Presidente',
            bgColor: 'bg-gray-700'
        }
    ];

    return (
        <section className="py-12 pb-5" id="organograma">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2 className="text-2xl font-semibold text-[#646464] mb-12">
                        Organograma
                    </h2>
                </RevealOnScroll>
            </div>

            <div className="bg-[#ffffff]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StaggerChildren>
                        <div className="grid md:grid-cols-3 gap-8 py-8">
                            {positions.map((position, index) => (
                                <RevealOnScroll 
                                    key={index} 
                                    direction="top" 
                                    delay={index * 0.2}
                                >
                                    <div className="flex flex-col items-center">
                                        {/* Logo */}
                                        <div className="relative w-48 h-48 mb-4">
                                            <Image
                                                src={position.logo}
                                                alt={`${position.company} Logo`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* Cargo */}
                                        <div className={`w-full text-center ${position.bgColor} text-white p-4 rounded-md`}>
                                            <div className="font-medium">
                                                {position.company}
                                            </div>
                                            <div className="text-sm mt-1">
                                                {position.role}
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </StaggerChildren>
                </div>
            </div>
        </section>
    );
} 