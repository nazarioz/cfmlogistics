import HeroSection from '@/components/home/hero.section';
import ServicesSection from '@/components/home/services.section';
import NewsSection from '@/components/home/news.section';
import SolutionsSection from '@/components/home/solutions.section';
import SocialResponsibilitySection from '@/components/home/social-responsibility.section';
import VideoSection from '@/components/home/video.section';
import PartnersSection from '@/components/home/partners.section';
import AboutSection from '@/components/home/about.section';

export const metadata = {
    title: "CFM LOGISTICS",
    description: "Associação de Empresas Moçambicanas de Consultoria",
}

export default function Page() {
    return (
        <main className="bg-white">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <NewsSection />
            <SolutionsSection />
            <SocialResponsibilitySection />
            <VideoSection />
            <PartnersSection />
        </main>
    );
}