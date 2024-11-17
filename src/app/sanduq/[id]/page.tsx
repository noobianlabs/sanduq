'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useCollectives } from '@/lib/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { PiggyBank, ArrowLeft, UserPlus, DollarSign } from 'lucide-react';
import PaymentForm from '@/components/PaymentForm';

export default function SanduqPage() {
  const params = useParams();
  const { getCollectiveById, joinCollective, contributeFunds, requestPayout } = useCollectives();
  const [newMemberName, setNewMemberName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const collective = getCollectiveById(params.id as string);

  if (!collective) {
    return <div>Sanduq not found</div>;
  }

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName) {
      joinCollective(collective.id, newMemberName);
      setNewMemberName('');
    }
  };

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMemberId && contributionAmount) {
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSuccess = () => {
    contributeFunds(collective.id, selectedMemberId, Number(contributionAmount));
    setContributionAmount('');
    setSelectedMemberId('');
    setShowPaymentForm(false);
    alert('Payment successful! Your contribution has been added to the Sanduq.');
  };

  const handlePayout = () => {
    if (collective.nextPayoutMemberId) {
      const payoutAmount = requestPayout(collective.id, collective.nextPayoutMemberId);
      if (payoutAmount > 0) {
        alert(`Payout of $${payoutAmount.toLocaleString()} has been processed for the current member.`);
      } else {
        alert("It's not your turn for a payout or there are no funds available.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sanduqs
        </Link>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{collective.name}</h1>
          <p className="text-gray-600 mb-4">{collective.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Balance: ${collective.balance}</p>
              <p className="text-gray-600">Goal: ${collective.goal}</p>
            </div>
            <PiggyBank className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Members</h3>
            <ul className="space-y-2">
              {collective.members.map((member) => (
                <li key={member.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                  <span>{member.name}</span>
                  <span className="text-gray-600">Contribution: ${member.contribution}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Join Sanduq</h3>
            <form onSubmit={handleJoin} className="space-y-4">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                <UserPlus className="w-5 h-5 inline-block mr-2" />
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Contribute Funds</h3>
          {showPaymentForm ? (
            <PaymentForm
              amount={Number(contributionAmount)}
              onSuccess={handlePaymentSuccess}
            />
          ) : (
            <form onSubmit={handleContribute} className="space-y-4">
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Member</option>
                {collective.members.map((member) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
              <input
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                placeholder="Amount"
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                <DollarSign className="w-5 h-5 inline-block mr-2" />
                Proceed to Payment
              </button>
            </form>
          )}
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Request Payout</h3>
          <button onClick={handlePayout} className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700">
            Request Payout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}