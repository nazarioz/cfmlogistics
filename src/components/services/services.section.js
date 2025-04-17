'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll, StaggerChildren } from '@/components/ui/reveal.animation';
import { LiaShipSolid, LiaWarehouseSolid, LiaOilCanSolid, LiaProjectDiagramSolid } from "react-icons/lia";
import Image from 'next/image';
import ImageService1 from '@/assets/images/maritime.jpeg';
import ImageService2 from '@/assets/images/warehouse.jpg';
import ImageService3 from '@/assets/images/oil-gas.png';
import ImageService4 from '@/assets/images/logistics.jpg';

export default function Services() {
    const { t } = useTranslation();

    const services = [
        {
            icon: <LiaShipSolid className="w-8 h-8" />,
            title: t('services.list.0.title'),
            description: t('services.list.0.description'),
            highlights: [
                t('services.list.0.highlights.0'),
                t('services.list.0.highlights.1'),
                t('services.list.0.highlights.2')
            ],
            href: 'servicos-mariticos',
            image: ImageService1
        },
        {
            icon: <LiaWarehouseSolid className="w-8 h-8" />,
            title: t('services.list.1.title'),
            description: t('services.list.1.description'),
            highlights: [
                t('services.list.1.highlights.0'),
                t('services.list.1.highlights.1'),
                t('services.list.1.highlights.2')
            ],
            href: 'servicos-armazenagem',
            image: ImageService2
        },
        {
            icon: <LiaOilCanSolid className="w-8 h-8" />,
            title: t('services.list.2.title'),
            description: t('services.list.2.description'),
            highlights: [
                t('services.list.2.highlights.0'),
                t('services.list.2.highlights.1'),
                t('services.list.2.highlights.2')
            ],
            href: 'petroleo-gas',
            image: ImageService3
        },
        {
            icon: <LiaProjectDiagramSolid className="w-8 h-8" />,
            title: t('services.list.3.title'),
            description: t('services.list.3.description'),
            highlights: [
                t('services.list.3.highlights.0'),
                t('services.list.3.highlights.1'),
                t('services.list.3.highlights.2')
            ],
            href: 'servicos-projectos',
            image: ImageService4
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('services.list.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('services.list.title')}
                            <span className="block font-light">{t('services.list.highlight')}</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                <StaggerChildren>
                    {services.map((service, index) => (
                        <RevealOnScroll key={index} delay={index * 0.1}>
                            <div id={service.href} className={`flex flex-col lg:flex-row gap-8 mb-24 last:mb-0 items-center
                                          ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Imagem */}
                                <div className="lg:w-1/2 relative">
                                    {/* Número decorativo */}
                                    <div className="absolute -left-4 -top-4 w-16 h-16 bg-[#fc4c04] rounded-lg 
                                                  flex items-center justify-center z-10 shadow-lg
                                                  transform -rotate-6">
                                        <span className="text-3xl font-bold text-white">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Container da imagem com decoração */}
                                    <div className="relative h-[300px] lg:h-[400px] w-full">
                                        {/* Decoração de fundo */}
                                        <div className="absolute -right-4 -bottom-4 w-full h-full border-2 
                                                      border-[#646464] rounded-xl opacity-20" />
                                        
                                        {/* Imagem principal */}
                                        <div className="relative h-full w-full rounded-xl overflow-hidden group">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-700 
                                                         group-hover:scale-110"
                                            />
                                            {/* Overlay Gradiente */}
                                            <div className="absolute inset-0 bg-gradient-to-r 
                                                          from-[#646464]/40 to-transparent opacity-0 
                                                          group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Conteúdo */}
                                <div className="lg:w-1/2">
                                    <div className="bg-white p-8 lg:p-10 rounded-xl shadow-sm hover:shadow-xl 
                                                  transition-all duration-500 group relative overflow-hidden">
                                        {/* Círculos decorativos */}
                                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#fc4c04]/5 
                                                      rounded-full group-hover:scale-150 transition-transform duration-700" />
                                        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-[#646464]/5 
                                                      rounded-full opacity-0 group-hover:opacity-100 
                                                      transition-all duration-700" />
                                        
                                        <div className="relative">
                                            {/* Ícone e Título */}
                                            <div className="flex items-start gap-4 mb-8">
                                                <div className="p-4 rounded-xl bg-[#fc4c04]/10 text-[#fc4c04]
                                                              group-hover:bg-[#fc4c04] group-hover:text-white
                                                              transition-all duration-500 transform group-hover:-rotate-6">
                                                    {service.icon}
                                                </div>
                                                <h3 className="text-2xl font-bold text-[#646464] group-hover:text-[#fc4c04] 
                                                             transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            {/* Descrição */}
                                            <p className="text-gray-600 leading-relaxed mb-8 font-light">
                                                {service.description}
                                            </p>

                                            {/* Linha decorativa */}
                                            <div className="w-16 h-1 bg-[#fc4c04]/20 mb-8 
                                                          group-hover:w-24 transition-all duration-500" />

                                            {/* Destaques */}
                                            <ul className="space-y-4">
                                                {service.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="flex items-center gap-4 group/item">
                                                        <div className="w-2 h-2 rounded-full bg-[#fc4c04] 
                                                                      group-hover/item:scale-150 transition-transform duration-300" />
                                                        <span className="text-gray-600 font-light">
                                                            {highlight}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    );
} 