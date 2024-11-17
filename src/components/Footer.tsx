import { Facebook, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Sanduq</h3>
            <p className="text-gray-400">Empowering communities through collaborative savings.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">FAQs</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white"><Facebook /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Twitter /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 Sanduq App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer