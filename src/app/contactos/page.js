import Hero from '@/components/contact/hero.section';
import ContactForm from '@/components/contact/form.section';
import MapLocation from '@/components/contact/map.section';
import OfficeInfo from '@/components/contact/office-info.section';

export const metadata = {
    title: "Contactos | CFM LOGISTICS",
    description: "Entre em contacto com a CFM LOGISTICS - Soluções logísticas integradas em Moçambique",
}

export default function ContactPage() {
    return (
        <main>
            <Hero />
            <OfficeInfo />
            <ContactForm />
            <MapLocation />
        </main>
    );
} 