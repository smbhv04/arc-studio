import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import LogoBar from './sections/LogoBar';
import PainAgitation from './sections/PainAgitation';
import Services from './sections/Services';
import SelectedWork from './sections/SelectedWork';
import Testimonial from './sections/Testimonial';
import Process from './sections/Process';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';

function App() {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <Hero />              {/* ① Transformation + ICP */}
        <LogoBar />           {/* ② Credibility strip */}
        <PainAgitation />     {/* ③ Name the pain */}
        <Services />          {/* ④ Solution mechanism */}
        <SelectedWork />      {/* ⑤ Visual proof */}
        <Testimonial />       {/* ⑥ Social proof moment */}
        <Process />           {/* ⑦ How it works (3 steps) */}
        <FAQ />               {/* ⑧ Objection handling */}
        <FinalCTA />          {/* ⑨ Conversion close */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
