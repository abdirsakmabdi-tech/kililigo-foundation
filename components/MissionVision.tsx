const missionPara1 = "Kililigo Foundation's mission is to provide timely humanitarian assistance and promote recovery, resilience, and social justice in Somalia and beyond."
const missionPara2Main = "We support vulnerable communities to rebuild livelihoods, uphold human rights, and enhance dignity."
const missionPara2Gray = "Kililigo Foundation is a premier local Non-Profit Civil Society Organization (NGO) headquartered in Garowe, Puntland State of Somalia."
const vision = 'Kililigo Foundation envisions a just, compassionate, and resilient world where all individuals have equal rights, access to essential services, and opportunities to thrive in inclusive and empowered communities.'

export default function MissionVision() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[minmax(0,auto)_1fr] gap-8 md:gap-20 lg:gap-32 xl:gap-40 mb-20 md:mb-28">
          <h2 className="text-lg md:text-xl font-semibold text-black font-sans">Our mission</h2>
          <div className="space-y-8 w-full">
            <p className="text-black font-sans text-lg md:text-xl leading-relaxed w-full">{missionPara1}</p>
            <p className="text-black font-sans text-lg md:text-xl leading-relaxed w-full">
              {missionPara2Main} <span className="text-gray-600">{missionPara2Gray}</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-[minmax(0,auto)_1fr] gap-8 md:gap-20 lg:gap-32 xl:gap-40">
          <h2 className="text-lg md:text-xl font-semibold text-black font-sans">Our vision</h2>
          <p className="text-black font-sans text-lg md:text-xl leading-relaxed w-full">{vision}</p>
        </div>
      </div>
    </section>
  )
}
