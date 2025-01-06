import { realEstateLeads } from './mock-real-estate-data';

let selectedGroups: string[] = [];

const mockGroups = [
  { id: 'group1', name: 'Downtown Real Estate' },
  { id: 'group2', name: 'Suburb Property Exchange' },
  { id: 'group3', name: 'Luxury Real Estate Marketplace' },
  { id: 'group4', name: 'First-Time Homebuyers Group' },
  { id: 'group5', name: 'Investment Properties Network' },
];

export async function getWhatsAppGroups() {
  return mockGroups;
}

export async function updateSelectedGroups(groups: string[]) {
  selectedGroups = groups;
}

export async function getMessagesFromSelectedGroups() {
  // Distribute leads across groups
  return realEstateLeads.map((lead, index) => ({
    ...lead,
    groupId: mockGroups[index % mockGroups.length].id,
    groupName: mockGroups[index % mockGroups.length].name,
    timestamp: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000) // Random timestamp within the last week
  })).filter(msg => selectedGroups.includes(msg.groupId));
}

