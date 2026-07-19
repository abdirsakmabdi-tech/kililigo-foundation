import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Kililigo Foundation',
  description: 'Get in touch with Kililigo Foundation — location and contact email.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
