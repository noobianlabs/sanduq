'use client';

import { useCollectives, Collective } from '@/lib/mockData';
import { PiggyBank } from 'lucide-react';
import Link from 'next/link';

const CollectiveCard: React.FC<{ collective: Collective }> = ({ collective }) => (
  <Link href={`/sanduq/${collective.id}`} className="block">
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <PiggyBank className="w-8 h-8 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold">{collective.name}</h3>
      </div>
      <p className="text-gray-600 mb-4">{collective.description}</p>
      <p className="text-blue-600 font-bold">
        Balance: ${collective.balance.toLocaleString()}
      </p>
    </div>
  </Link>
);

const CollectivesList: React.FC = () => {
  const { collectives } = useCollectives();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Active Sanduqs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectives.map((collective) => (
          <CollectiveCard key={collective.id} collective={collective} />
        ))}
      </div>
    </div>
  );
};

export default CollectivesList;