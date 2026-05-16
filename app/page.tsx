import Navbar from '@/components/common/Navbar'
import {
  HeroSection,
  ProblemSection,
  SolutionSection,
  FeaturesSection,
  TechStackSection,
} from '@/components/landing/LandingComponents'
import { TeamSection, Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Navbar showSidebar={false} />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <TechStackSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}
