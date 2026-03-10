import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import LogoBar from './sections/LogoBar';
import PainAgitation from './sections/PainAgitation';
import Services from './sections/Services';
import SelectedWork from './sections/SelectedWork';
import Testimonial from './sections/Testimonial';
import Process from './sections/Process';
import WhyUs from './sections/WhyUs';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';

function App() {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <Hero />              {/* ① Full-viewport dark hero — what we do */}
        <LogoBar />           {/* ② Immediate credibility strip */}
        <PainAgitation />     {/* ③ Name the problem */}
        <Services />          {/* ④ Solution mechanism */}
        <SelectedWork />      {/* ⑤ Portfolio proof */}
        <Testimonial />       {/* ⑥ 3-card social proof */}
        <Process />           {/* ⑦ How it works (dark) */}
        <WhyUs />             {/* ⑧ Why ARC vs. others (dark) */}
        <Pricing />           {/* ⑨ Transparent pricing cards */}
        <FAQ />               {/* ⑩ Objection handling */}
        <FinalCTA />          {/* ⑪ Dark conversion close + urgency */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
