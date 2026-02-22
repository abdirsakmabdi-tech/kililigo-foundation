import Hero from '@/components/Hero'
import HeroIntro from '@/components/HeroIntro'
import ProgramGrid from '@/components/ProgramGrid'
import CEOMessage from '@/components/CEOMessage'
import ImpactCounter from '@/components/ImpactCounter'
import PartnersStrip from '@/components/PartnersStrip'
import CoreValues from '@/components/CoreValues'

export default function Home() {
  return (
    <>
      <Hero />
      <HeroIntro />
      <ProgramGrid />
      <CEOMessage />
      <ImpactCounter />
      <CoreValues />
      <PartnersStrip />
    </>
  )
}
