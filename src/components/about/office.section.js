'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import officeImage from '@/assets/images/office.png';
import Link from 'next/link';

export default function OfficeSection() {
    const { t } = useTranslation();

    const contactInfo = {
        location: "Maputo",
        phone: "(+258) 849704924 / (+258) 833022610",
        email: "cfmlogistics@logistics.cfm.co.mz",
        address: "Maputo Business Tower - Rua dos Desportistas, n.º 480, 6° andar"
    };

    return (
        <section className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Cabeçalho */}
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('about.office.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('about.office.title')}
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            {t('about.office.description')}
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-2 gap-8 h-full">
                    {/* Informações de Contato */}
                    <RevealOnScroll>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg 
                                      transition-all duration-300 group relative overflow-hidden
                                      flex flex-col h-[370px]">
                            {/* Círculo decorativo */}
                            <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#fc4c04]/5 
                                          rounded-full group-hover:scale-150 transition-transform duration-500" />

                            <h3 className="text-2xl font-bold text-[#646464] mb-8 relative">
                                {contactInfo.location}
                            </h3>

                            <div className="space-y-8 relative flex-grow flex flex-col justify-start">
                                {/* Telefone */}
                                <div className="flex items-center gap-4 group/item">
                                    <div className="p-3 rounded-lg bg-[#fc4c04]/10 text-[#fc4c04]
                                                  group-hover/item:bg-[#fc4c04] group-hover/item:text-white
                                                  transition-all duration-300">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{t('about.office.labels.phone')}</p>
                                        <p className="text-[#646464] font-medium">{contactInfo.phone}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-4 group/item">
                                    <div className="p-3 rounded-lg bg-[#fc4c04]/10 text-[#fc4c04]
                                                  group-hover/item:bg-[#fc4c04] group-hover/item:text-white
                                                  transition-all duration-300">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{t('about.office.labels.email')}</p>
                                        <p className="text-[#646464] font-medium">{contactInfo.email}</p>
                                    </div>
                                </div>

                                {/* Endereço */}
                                <div className="flex items-center gap-4 group/item">
                                    <div className="p-3 rounded-lg bg-[#fc4c04]/10 text-[#fc4c04]
                                                  group-hover/item:bg-[#fc4c04] group-hover/item:text-white
                                                  transition-all duration-300">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{t('about.office.labels.address')}</p>
                                        <p className="text-[#646464] font-medium">{contactInfo.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Imagem do Escritório */}
                    <RevealOnScroll delay={0.2}>
                        <div className="relative rounded-xl overflow-hidden group h-[370px]">
                            <Image
                                src={officeImage}
                                alt={t('about.office.image_alt')}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay Gradiente */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#646464]/80 to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8">
                                <Link
                                    href="/contactos"
                                    className="inline-flex items-center px-8 py-4 bg-[#fc4c04] text-white 
                                             rounded-full hover:bg-white hover:text-[#646464] 
                                             transition-all duration-300 group/btn w-full justify-center"
                                >
                                    {t('about.office.cta')}
                                    <svg
                                        className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
} 