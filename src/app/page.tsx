import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import HowToVoteSection from '@/sections/HowToVoteSection';
import VoteFormSection from '@/sections/VoteFormSection';
import ResultsSection from '@/sections/ResultsSection';
import TestimonialsSection from '@/sections/TestimonialsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowToVoteSection id="pourquoi-voter" />
        <div id="voter">
          <VoteFormSection />
        </div>
        <TestimonialsSection />
        <ResultsSection />
      </main>
      <Footer />
    </div>
  );
}
