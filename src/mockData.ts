export interface Member {
  id: string;
  name: string;
  contribution: number;
}

export interface Sanduq {
  id: string;
  name: string;
  description: string;
  balance: number;
  members: Member[];
  goal: number;
  nextPayoutMemberId: string | null;
}

export let mockSanduqs: Sanduq[] = [
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
];

export const createSanduq = (name: string, description: string, goal: number): Sanduq => {
  const newSanduq: Sanduq = {
    id: String(mockSanduqs.length + 1),
    name,
    description,
    balance: 0,
    members: [],
    goal,
    nextPayoutMemberId: null
  };
  mockSanduqs.push(newSanduq);
  return newSanduq;
};

export const addMember = (sanduqId: string, memberName: string) => {
  const sanduq = mockSanduqs.find(s => s.id === sanduqId);
  if (sanduq) {
    const newMember: Member = {
      id: String(sanduq.members.length + 1),
      name: memberName,
      contribution: 0
    };
    sanduq.members.push(newMember);
    if (sanduq.nextPayoutMemberId === null) {
      sanduq.nextPayoutMemberId = newMember.id;
    }
  }
};

export const contributeFunds = (sanduqId: string, memberId: string, amount: number) => {
  const sanduq = mockSanduqs.find(s => s.id === sanduqId);
  if (sanduq) {
    const member = sanduq.members.find(m => m.id === memberId);
    if (member) {
      member.contribution += amount;
      sanduq.balance += amount;
    }
  }
};

export const requestPayout = (sanduqId: string, memberId: string): number => {
  const sanduq = mockSanduqs.find(s => s.id === sanduqId);
  if (sanduq && sanduq.nextPayoutMemberId === memberId) {
    const payoutAmount = sanduq.balance;
    sanduq.balance = 0;
    sanduq.members.forEach(member => {
      member.contribution = 0;
    });
    
    // Set next member for payout
    const currentIndex = sanduq.members.findIndex(m => m.id === memberId);
    const nextIndex = (currentIndex + 1) % sanduq.members.length;
    sanduq.nextPayoutMemberId = sanduq.members[nextIndex].id;
    
    return payoutAmount;
  }
  return 0;
};