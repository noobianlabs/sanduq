import { useState, useEffect } from 'react';

export interface Member {
  id: string;
  name: string;
  contribution: number;
}

export interface Collective {
  id: string;
  name: string;
  description: string;
  balance: number;
  members: Member[];
  goal: number;
  nextPayoutMemberId: string | null;
}

const initialCollectives: Collective[] = [
  {
    id: '1',
    name: 'Family Savings Circle',
    description: 'A savings group for our extended family',
    balance: 1500,
    members: [
      { id: '1', name: 'John Doe', contribution: 500 },
      { id: '2', name: 'Jane Smith', contribution: 1000 },
    ],
    goal: 5000,
    nextPayoutMemberId: '1'
  },
  {
    id: '2',
    name: 'Neighborhood Fund',
    description: 'Collective savings for community projects',
    balance: 2750,
    members: [
      { id: '3', name: 'Alice Johnson', contribution: 1250 },
      { id: '4', name: 'Bob Williams', contribution: 1500 },
    ],
    goal: 10000,
    nextPayoutMemberId: '3'
  },
  {
    id: '3',
    name: 'Friends Travel Group',
    description: 'Saving up for our annual trip',
    balance: 3200,
    members: [
      { id: '5', name: 'Charlie Brown', contribution: 1200 },
      { id: '6', name: 'Diana Clark', contribution: 2000 },
    ],
    goal: 8000,
    nextPayoutMemberId: '5'
  }
];

let collectivesData = [...initialCollectives];

export const useCollectives = () => {
  const [collectives, setCollectives] = useState<Collective[]>(collectivesData);

  useEffect(() => {
    setCollectives(collectivesData);
  }, []);

  const addCollective = (name: string, description: string, goal: number) => {
    const newCollective: Collective = {
      id: String(collectivesData.length + 1),
      name,
      description,
      balance: 0,
      members: [],
      goal,
      nextPayoutMemberId: null
    };
    collectivesData = [...collectivesData, newCollective];
    setCollectives(collectivesData);
    return newCollective;
  };

  const getCollectiveById = (id: string) => {
    return collectivesData.find(collective => collective.id === id);
  };

  const joinCollective = (collectiveId: string, memberName: string) => {
    const collective = collectivesData.find(c => c.id === collectiveId);
    if (collective) {
      const newMember: Member = {
        id: String(collective.members.length + 1),
        name: memberName,
        contribution: 0
      };
      collective.members.push(newMember);
      if (collective.nextPayoutMemberId === null) {
        collective.nextPayoutMemberId = newMember.id;
      }
      setCollectives([...collectivesData]);
    }
  };

  const contributeFunds = (collectiveId: string, memberId: string, amount: number) => {
    const collective = collectivesData.find(c => c.id === collectiveId);
    if (collective) {
      const member = collective.members.find(m => m.id === memberId);
      if (member) {
        member.contribution += amount;
        collective.balance += amount;
        setCollectives([...collectivesData]);
      }
    }
  };

  const requestPayout = (collectiveId: string, memberId: string) => {
    const collective = collectivesData.find(c => c.id === collectiveId);
    if (collective && collective.nextPayoutMemberId === memberId) {
      const payoutAmount = collective.balance;
      collective.balance = 0;
      collective.members.forEach(member => {
        member.contribution = 0;
      });
      
      // Set next member for payout
      const currentIndex = collective.members.findIndex(m => m.id === memberId);
      const nextIndex = (currentIndex + 1) % collective.members.length;
      collective.nextPayoutMemberId = collective.members[nextIndex].id;
      
      setCollectives([...collectivesData]);
      return payoutAmount;
    }
    return 0;
  };

  return { collectives, addCollective, getCollectiveById, joinCollective, contributeFunds, requestPayout };
};