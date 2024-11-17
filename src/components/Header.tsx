import { Wallet } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Wallet className="w-8 h-8 text-blue-600" />
          <Link href="/" className="text-xl font-bold text-gray-800">Sanduq</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/#features" className="text-gray-600 hover:text-blue-600">Features</Link></li>
            <li><Link href="/#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link></li>
            <li><Link href="/create-sanduq" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Create Sanduq</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header