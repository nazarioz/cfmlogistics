import Hero from '@/components/publications/hero.section';
import NewsList from '@/components/publications/news.section';

export const metadata = {
    title: "Publicações | CFM LOGISTICS",
    description: "Acompanhe as últimas notícias e atualizações da CFM LOGISTICS",
}

export default function PublicacoesPage() {
    return (
        <main>
            <Hero />
            <NewsList />
        </main>
    );
} 