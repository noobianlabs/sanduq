import { Users, Shield, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: <Users className="w-12 h-12 text-blue-600" />,
    title: 'Community Powered',
    description: 'Join trusted circles and save together with friends, family, or colleagues.'
  },
  {
    icon: <Shield className="w-12 h-12 text-blue-600" />,
    title: 'Secure & Transparent',
    description: 'Your savings are protected with bank-level security and full transparency.'
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
    title: 'Achieve Goals Faster',
    description: 'Regular contributions and community support help you reach your financial targets.'
  }
]

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Sanduq?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features