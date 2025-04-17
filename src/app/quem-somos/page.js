import Hero from '@/components/about/hero.section';
import Description from '@/components/about/description.section';
import CreationSection from '@/components/about/creation.section';
import MissionVision from '@/components/about/mission-vision.section';
import BannerSection from '@/components/about/banner.section';
import TimelineSection from '@/components/about/timeline.section';
import OfficeSection from '@/components/about/office.section';
import Organogram from '@/components/about/organogram.section';
import ObjectivesSection from '@/components/about/objectives';
export const metadata = {
    title: "Quem Somos | CFM LOGISTICS",
    description: "Conheça a CFM LOGISTICS e nossa missão de transformar a logística em Moçambique",
}

export default function QuemSomosPage() {
    return (
        <main>
            <Hero />
            <Description />
            <CreationSection />
            <MissionVision />
            <ObjectivesSection />
            <TimelineSection />
            <BannerSection />
            <Organogram />
            <OfficeSection />
        </main>
    );
} 