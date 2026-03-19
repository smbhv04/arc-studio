import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import Philosophy from '@/components/Philosophy'
import Process from '@/components/Process'
import Work from '@/components/Work'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import ClientShell from '@/components/ClientShell'

export default function Home() {
  return (
    <ClientShell>
      <main>
        <Hero />
        <ProblemSection />
        <Philosophy />
        <Work />
        <Process />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </ClientShell>
  )
}

