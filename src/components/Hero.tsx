import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Save Together, Thrive Together</h1>
        <p className="text-xl text-gray-600 mb-8">Sanduq brings the power of community savings to your fingertips. Join a trusted circle, save regularly, and achieve your financial goals.</p>
        <Link href="#" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Start Your Sanduq
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}

export default Hero