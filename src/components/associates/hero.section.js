'use client';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function Hero() {
    return (
        <section className="relative py-20 bg-[#646464]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Associados
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Conheça as empresas que fazem parte da nossa associação e 
                            contribuem para o desenvolvimento da consultoria em Moçambique.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
} 