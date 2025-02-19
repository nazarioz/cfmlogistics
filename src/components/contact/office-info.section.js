'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { LiaPhoneSolid, LiaEnvelopeSolid, LiaMapMarkerSolid, LiaClockSolid } from "react-icons/lia";

export default function OfficeInfo() {
    const { t } = useTranslation();

    const locations = [
        {
            city: "Maputo",
            address: "Edifício Maputo Business Tower - Rua dos Desportistas, n.º 480, 6° andar",
            phone: "(+258) 849704924 / (+258) 833022610",
            email: "info@cfm.co.mz",
            hours: "Segunda a Sexta, 8:00 - 17:00"
        },
        {
            city: "Nacala",
            address: "Rua do Porto, n.º 70, Cidade Baixa",
            phone: "(+258) 849704924 / (+258) 833022610",
            email: "info@cfm.co.mz",
            hours: "Segunda a Sexta, 8:00 - 17:00"
        },
        {
            city: "Pemba",
            address: "Rua do Porto, Bairro Cimento",
            phone: "(+258) 849704924 / (+258) 833022610",
            email: "info@cfm.co.mz",
            hours: "Segunda a Sexta, 8:00 - 17:00"
        }
    ];

    const InfoItem = ({ icon, label, value }) => (
        <div className="flex items-start gap-4 mb-4 group/item">
            <div className="p-3 rounded-lg bg-[#fc4c04]/10 text-[#fc4c04]
                          group-hover/item:bg-[#fc4c04] group-hover/item:text-white
                          transition-all duration-300 flex-shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-[#646464]">{value}</p>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#646464]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('contact.office.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('contact.office.title')}
                            <span className="block font-light mt-2">{t('contact.office.highlight')}</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((location, index) => (
                        <RevealOnScroll key={index} delay={index * 0.1}>
                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg 
                                          transition-all duration-300 group relative overflow-hidden">
                                {/* Círculo decorativo */}
                                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fc4c04]/5 
                                              rounded-full group-hover:scale-150 transition-transform duration-500" />
                                
                                {/* Cidade */}
                                <h3 className="text-xl font-bold text-[#646464] mb-6 relative">
                                    {location.city}
                                </h3>

                                {/* Informações de Contacto */}
                                <InfoItem 
                                    icon={<LiaMapMarkerSolid className="w-6 h-6" />}
                                    label={t('contact.office.labels.address')}
                                    value={location.address}
                                />
                                <InfoItem 
                                    icon={<LiaPhoneSolid className="w-6 h-6" />}
                                    label={t('contact.office.labels.phone')}
                                    value={location.phone}
                                />
                                <InfoItem 
                                    icon={<LiaEnvelopeSolid className="w-6 h-6" />}
                                    label={t('contact.office.labels.email')}
                                    value={location.email}
                                />
                                <InfoItem 
                                    icon={<LiaClockSolid className="w-6 h-6" />}
                                    label={t('contact.office.labels.hours')}
                                    value={location.hours}
                                />

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