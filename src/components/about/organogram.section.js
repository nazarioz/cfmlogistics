'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function Organogram() {
    const { t } = useTranslation();

    const executives = [
        {
            name: "Joaquim Uelemo Zucule",
            role: t("about.organogram.presidente_conselho"),
            level: 1
        },
        {
            name: "Hélder Mário Chambal",
            role: t("about.organogram.presidente_comissao_executiva"),
            level: 2
        },
        {
            name: "José Joaquim Daúde",
            role: t("about.organogram.director_operacoes"),
            level: 3
        },
        {
            name: "Manuel Dinis Mubai",
            role: t("about.organogram.director_comercial_financeiro"),
            level: 3
        },
        {
            name: "Beatriz Daí",
            role: t("about.organogram.chefe_administração_recursos_humanos"),
            level: 3
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-[#2f2f2f] to-[#646464] relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute left-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full -translate-x-1/2" />
            <div className="absolute right-0 top-1/2 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4 relative">
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-2">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('about.organogram.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            {t('about.organogram.title')}
                            <span className="block font-light mt-2">
                                {t('about.organogram.description')}
                            </span>
                        </h2>
                    </div>
                </RevealOnScroll>

                <div className="flex flex-col items-center mt-16">
                    <div className="grid gap-16 w-full max-w-7xl">
                        {/* Nível 1 - Presidente do Conselho */}
                        <RevealOnScroll>
                            <div className="flex justify-center">
                                {executives
                                    .filter(exec => exec.level === 1)
                                    .map((exec, index) => (
                                        <div key={index} className="relative">
                                            <ExecutiveCard {...exec} />
                                            <div className="absolute left-1/2 bottom-0 w-1 h-24 bg-gradient-to-b from-[#fc4c04] to-[#fc4c04]/20 transform translate-y-full -translate-x-1/2" />
                                        </div>
                                    ))}
                            </div>
                        </RevealOnScroll>

                        {/* Nível 2 - Presidente Executivo */}
                        <RevealOnScroll delay={0.2}>
                            <div className="flex justify-center">
                                {executives
                                    .filter(exec => exec.level === 2)
                                    .map((exec, index) => (
                                        <div key={index} className="relative">
                                            <ExecutiveCard {...exec} />
                                            <div className="absolute left-1/2 bottom-0 w-1 h-24 bg-gradient-to-b from-[#fc4c04] to-[#fc4c04]/20 transform translate-y-full -translate-x-1/2" />
                                            <div className="absolute bottom-0 left-1/2 w-[800px] transform translate-y-[96px] -translate-x-1/2">
                                                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#fc4c04] to-transparent shadow-[0_0_10px_rgba(252,76,4,0.3)]" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </RevealOnScroll>

                        {/* Nível 3 - Diretores */}
                        <RevealOnScroll delay={0.4}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center relative">
                                {executives
                                    .filter(exec => exec.level === 3)
                                    .map((exec, index) => (
                                        <div key={index} className="relative">
                                            <div className="absolute left-1/2 top-0 w-1 h-24 bg-gradient-to-t from-[#fc4c04] to-[#fc4c04]/20 transform -translate-y-full -translate-x-1/2" />
                                            <ExecutiveCard {...exec} />
                                        </div>
                                    ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExecutiveCard({ name, role }) {
    const { t } = useTranslation();
    
    return (
        <div className="group relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 w-72 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
                {/* Círculo decorativo */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fc4c04]/5 
                              rounded-full group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#fc4c04]/20">
                        <div className="w-full h-full bg-gradient-to-br from-[#fc4c04]/5 to-[#fc4c04]/10 flex items-center justify-center">
                            <span className="text-3xl text-white font-bold">
                                {name.charAt(0)}
                            </span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2 text-white">{name}</h3>
                    <p className="text-sm text-center text-white/70 font-medium">{role}</p>
                </div>
            </div>
        </div>
    );
} 