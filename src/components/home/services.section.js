'use client';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import historyImage from '@/assets/images/working-time.png';
import trainImage from '@/assets/images/train.png';
import leafImage from '@/assets/images/planet-earth.png';

export default function ServicesSection() {
    const { t } = useTranslation();

    const services = [
        {
            icon: historyImage,
            ...t('home.services.items.0', { returnObjects: true })
        },
        {
            icon: trainImage,
            ...t('home.services.items.1', { returnObjects: true })
        },
        {
            icon: leafImage,
            ...t('home.services.items.2', { returnObjects: true })
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#646464]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 max-w-7xl mx-auto">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('home.services.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('home.services.title')}
                        </h2>

                        <p className="text-gray-600 text-lg font-light">
                            {t('home.services.description')}
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <RevealOnScroll key={index} delay={index * 0.1}>
                            <div className="bg-white p-8 rounded-xl shadow-sm group hover:shadow-lg 
                                          transition-all duration-300 relative overflow-hidden">
                                {/* Círculo decorativo */}
                                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fc4c04]/5 
                                              rounded-full group-hover:scale-150 transition-transform duration-500" />
                                
                                {/* Ícone */}
                                <div className="relative w-16 h-16 mb-6">
                                    <Image
                                        src={service.icon}
                                        alt={service.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Título */}
                                <h3 className="text-xl font-bold text-[#646464] mb-4">
                                    {service.title}
                                </h3>

                                {/* Descrição */}
                                <p className="text-gray-600">
                                    {service.description}
                                </p>

                                {/* Linha decorativa */}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fc4c04]/20 
                                              group-hover:w-full transition-all duration-500" />
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
} 