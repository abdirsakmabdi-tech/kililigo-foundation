import Hero from '@/components/Hero'
import HeroIntro from '@/components/HeroIntro'
import MissionVision from '@/components/MissionVision'
import ProgramGrid from '@/components/ProgramGrid'
import CEOMessage from '@/components/CEOMessage'
import ImpactCounter from '@/components/ImpactCounter'
import PartnersStrip from '@/components/PartnersStrip'
import DonateBanner from '@/components/DonateBanner'

export default function Home() {
  return (
    <>
      <Hero />
      <HeroIntro />
      <MissionVision />
      <ProgramGrid />
      <CEOMessage />
      <ImpactCounter />
      <PartnersStrip />
      <DonateBanner />
    </>
  )
}
