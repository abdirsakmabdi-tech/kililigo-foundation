export type SearchItem = {
  title: string
  description: string
  href: string
  category: string
}

export const searchData: SearchItem[] = [
  // Pages
  {
    title: 'About Us',
    description: 'Learn about Kililigo Foundation — our mission, vision, leadership, and core values.',
    href: '/about',
    category: 'Page',
  },
  {
    title: 'Programs',
    description: 'Explore our comprehensive initiatives designed to support vulnerable communities across Somalia.',
    href: '/programs',
    category: 'Page',
  },

  // Mission & Vision
  {
    title: 'Our Mission',
    description:
      "Kililigo Foundation's mission is to provide timely humanitarian assistance and promote recovery, resilience, and social justice in Somalia and beyond. We support vulnerable communities to rebuild livelihoods, uphold human rights, and enhance dignity.",
    href: '/about',
    category: 'About',
  },
  {
    title: 'Our Vision',
    description:
      'A just, compassionate, and resilient world where all individuals have equal rights, access to essential services, and opportunities to thrive in inclusive and empowered communities.',
    href: '/about',
    category: 'About',
  },

  // Leadership
  {
    title: 'Bashir Said Ismail — Executive Director',
    description: 'Executive Director of Kililigo Foundation, leading strategic direction and operations.',
    href: '/about',
    category: 'Leadership',
  },
  {
    title: 'Mohamed Abullahi Said — Board Chair',
    description: 'Board Chair of Kililigo Foundation, providing governance and oversight.',
    href: '/about',
    category: 'Leadership',
  },
  {
    title: 'Abdukadir Haji Mohamed — Finance and Operation Officer',
    description: 'Oversees financial management and operational activities at Kililigo Foundation.',
    href: '/about',
    category: 'Leadership',
  },
  {
    title: 'Mohamed Abdi Haji — Program Coordinator',
    description: 'Coordinates programs and initiatives at Kililigo Foundation.',
    href: '/about',
    category: 'Leadership',
  },
  {
    title: 'Abdiqadir Haji Mohamed — Project Officer',
    description: 'Manages project execution and delivery at Kililigo Foundation.',
    href: '/about',
    category: 'Leadership',
  },
  {
    title: 'Said Dirac — Democracy Consultant',
    description: 'Provides consultancy on democracy and governance matters.',
    href: '/about',
    category: 'Leadership',
  },
  {
    title: 'Salim Said Salim — Lawyer Consultant',
    description: 'Provides legal consultancy and guidance for the foundation.',
    href: '/about',
    category: 'Leadership',
  },
  {
    title: 'Abdikadir Mumin — Education Consultant',
    description: 'Provides consultancy on education programs and initiatives.',
    href: '/about',
    category: 'Leadership',
  },

  // Core Values
  {
    title: 'Core Value: Humanity',
    description: 'Respect for human life, dignity, and well-being.',
    href: '/about',
    category: 'Core Values',
  },
  {
    title: 'Core Value: Neutrality',
    description: 'Non-alignment with political, ethnic, or religious interests.',
    href: '/about',
    category: 'Core Values',
  },
  {
    title: 'Core Value: Impartiality',
    description: 'Assistance based solely on need.',
    href: '/about',
    category: 'Core Values',
  },
  {
    title: 'Core Value: Independence',
    description: 'Autonomous humanitarian action.',
    href: '/about',
    category: 'Core Values',
  },
  {
    title: 'Core Value: Accountability',
    description: 'Transparency, ethical management, and community participation.',
    href: '/about',
    category: 'Core Values',
  },
  {
    title: 'Core Value: Integrity',
    description: 'Zero tolerance for corruption and misconduct.',
    href: '/about',
    category: 'Core Values',
  },
  {
    title: 'Core Value: Respect',
    description: 'Cultural sensitivity, inclusion, and human rights protection.',
    href: '/about',
    category: 'Core Values',
  },
  {
    title: 'Core Value: Empowerment',
    description: 'Strengthening local capacity and sustainable solutions.',
    href: '/about',
    category: 'Core Values',
  },

  // Programs
  {
    title: 'Humanitarian Assistance & Emergency Response',
    description:
      'Rapid, life-saving support during disasters and conflicts, including emergency food, shelter, and essential WASH services to meet immediate needs and protect dignity.',
    href: '/programs',
    category: 'Program',
  },
  {
    title: 'Health & Nutrition',
    description:
      'Accessible primary healthcare, mobile clinic services, maternal and child health programs, nutrition support, and disease prevention initiatives to improve community health outcomes.',
    href: '/programs',
    category: 'Program',
  },
  {
    title: 'Education & Child Protection',
    description:
      'Safe, inclusive education and child protection through learning opportunities, psychosocial support, and safe spaces that promote resilience and child well-being.',
    href: '/programs',
    category: 'Program',
  },
  {
    title: 'Protection & Human Rights',
    description:
      'Protection and legal support to refugees, IDPs, and vulnerable groups, promoting rights awareness, access to justice, and the prevention of abuse and exploitation.',
    href: '/programs',
    category: 'Program',
  },
  {
    title: "Women's Economic Empowerment",
    description:
      'Economic self-reliance and gender equality by supporting livelihoods, skills development, and income-generating opportunities, while fostering safe and inclusive environments for women and youth.',
    href: '/programs',
    category: 'Program',
  },
  {
    title: 'Youth Leadership and Civic Engagement',
    description:
      'Youth empowerment through skills development and meaningful participation in community and public decision-making, enabling them to drive positive change and strengthen social cohesion.',
    href: '/programs',
    category: 'Program',
  },
  {
    title: 'Peacebuilding & Social Cohesion',
    description:
      'Strengthening social cohesion through dialogue, reconciliation, conflict prevention, trauma healing, and post-crisis recovery initiatives.',
    href: '/programs',
    category: 'Program',
  },

  // Target Beneficiaries
  {
    title: 'Target Beneficiaries: Internally Displaced Persons',
    description: 'Support for internally displaced persons (IDPs) affected by conflict and disaster.',
    href: '/programs',
    category: 'Beneficiaries',
  },
  {
    title: 'Target Beneficiaries: Refugees and Host Communities',
    description: 'Assistance for refugees and the communities that host them.',
    href: '/programs',
    category: 'Beneficiaries',
  },
  {
    title: 'Target Beneficiaries: Women and Girls',
    description: 'Programs focused on the safety, empowerment, and well-being of women and girls.',
    href: '/programs',
    category: 'Beneficiaries',
  },
  {
    title: 'Target Beneficiaries: Children and Youth',
    description: 'Educational and protective services for children and young people.',
    href: '/programs',
    category: 'Beneficiaries',
  },
  {
    title: 'Target Beneficiaries: Persons with Disabilities',
    description: 'Inclusive support for persons living with disabilities.',
    href: '/programs',
    category: 'Beneficiaries',
  },
  {
    title: 'Target Beneficiaries: Crisis-Affected Populations',
    description: 'Relief and recovery support for crisis-affected and marginalized populations.',
    href: '/programs',
    category: 'Beneficiaries',
  },
]
