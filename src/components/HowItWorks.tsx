import { UserPlus, PiggyBank, Gift } from 'lucide-react'

const steps = [
  {
    icon: <UserPlus className="w-12 h-12 text-blue-600" />,
    title: 'Create or Join a Sanduq',
    description: 'Start your own savings circle or join an existing one with people you trust.'
  },
  {
    icon: <PiggyBank className="w-12 h-12 text-blue-600" />,
    title: 'Contribute Regularly',
    description: 'Make regular contributions to your Sanduq based on the agreed schedule.'
  },
  {
    icon: <Gift className="w-12 h-12 text-blue-600" />,
    title: 'Receive Your Payout',
    description: "When it's your turn, receive the full Sanduq amount to meet your financial goals."
  }
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How Sanduq Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks