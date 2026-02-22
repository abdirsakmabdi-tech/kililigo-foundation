'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-sans uppercase tracking-tight mb-3">
          Contact Us
        </h1>
        <p className="text-gray-500 text-sm font-sans mb-8">
          Have a question, partnership idea, or want to support our work? We&apos;d love to hear from you.
        </p>

        {submitted ? (
          <div className="bg-white/60 rounded-xl px-8 py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-sans mb-2">Message sent!</h2>
            <p className="text-gray-500 text-sm font-sans">We&apos;ll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#d8d4ce] text-gray-800 placeholder-gray-500 text-sm font-sans px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#d8d4ce] text-gray-800 placeholder-gray-500 text-sm font-sans px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            <textarea
              name="message"
              placeholder="Message*"
              required
              rows={6}
              value={form.message}
              onChange={handleChange}
              className="w-full bg-[#d8d4ce] text-gray-800 placeholder-gray-500 text-sm font-sans px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-400 transition resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white text-xs font-bold font-sans uppercase tracking-widest py-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 mt-1"
            >
              Submit
            </button>
          </form>
        )}

        {/* Contact details */}
        <div className="mt-10 pt-8 border-t border-gray-400/40 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-1">Location</p>
            <p className="text-gray-700 font-medium text-sm font-sans">Haji Ali Road, Hantiwadag,<br />Garowe, Somalia</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-1">Email</p>
            <a href="mailto:info@kililigo.org" className="text-gray-700 font-medium text-sm font-sans hover:text-primary transition-colors">info@kililigo.org</a>
          </div>
        </div>

      </div>
    </div>
  )
}
