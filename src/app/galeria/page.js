import Hero from '@/components/gallery/hero.section';
import GalleryGrid from '@/components/gallery/grid.section';
import Head from 'next/head';

export const metadata = {
    title: "Galeria | CFM LOGISTICS",
    description: "Explore nossa galeria de imagens e conheça mais sobre nossas operações e infraestrutura logística",
    alternates: {
        canonical: 'https://www.CFML.org.mz/galeria',
    },
    openGraph: {
        title: 'Galeria | CFML',
        description: 'Galeria de imagens da CFML',
        url: 'https://www.aemc.org.mz/galeria',
    }
}

export default function GaleriaPage() {
    return (
        <main>
            <Hero />
            <GalleryGrid />
        </main>
    );
} 