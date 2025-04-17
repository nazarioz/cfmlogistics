import Hero from '@/components/services/hero.section';
import Introduction from '@/components/services/introduction.section';
import Services from '@/components/services/services.section';
import Differentials from '@/components/services/differentials.section';
import Achievements from '@/components/services/achievements.section';
import ContactCTA from '@/components/services/contact-cta.section';

export const metadata = {
    title: "Serviços | CFM LOGISTICS",
    description: "Soluções logísticas integradas para conectar Moçambique ao mundo",
}

export default function ServicosPage() {
    return (
        <main>
            <Hero />
            <Introduction />
            <Services />
            <Differentials />
            <ContactCTA />
        </main>
    );
} 