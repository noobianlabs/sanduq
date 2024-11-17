import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'
import CollectivesList from '@/components/CollectivesList'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <div className="container mx-auto px-4 py-12">
        <CollectivesList />
        <div className="mt-8 text-center">
          <Link href="/create-sanduq" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Create New Sanduq
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}