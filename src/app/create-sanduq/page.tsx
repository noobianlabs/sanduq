'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCollectives } from '@/lib/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CreateSanduqPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const router = useRouter();
  const { addCollective } = useCollectives();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = addCollective(name, description, Number(goal));
      alert(`Sanduq "${result.name}" created successfully!`);
      setName('');
      setDescription('');
      setGoal('');
      router.push('/');
    } catch (error) {
      console.error('Error creating Sanduq:', error);
      alert('Failed to create Sanduq. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Create a New Sanduq</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Sanduq Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Savings Goal</label>
            <input
              type="number"
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create Sanduq
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}