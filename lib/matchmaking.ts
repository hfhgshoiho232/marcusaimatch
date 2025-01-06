import { mockOpenAI } from './mock-openai';
import { getMessagesFromSelectedGroups } from './mock-whatsapp';

const ai = mockOpenAI();

interface RealEstateLead {
  id: string;
  type: 'buyer' | 'seller';
  area: string;
  bedrooms: 1 | 2 | 3 | 4;
  price: number;
  message: string;
  groupId: string;
  groupName: string;
  timestamp: number;
}

interface Match {
  buyer: RealEstateLead;
  seller: RealEstateLead;
  score: number;
}

export async function getMatches(): Promise<Match[]> {
  const messages = await getMessagesFromSelectedGroups();
  const leads = messages as RealEstateLead[];
  
  const buyerLeads = leads.filter(lead => lead.type === 'buyer');
  const sellerLeads = leads.filter(lead => lead.type === 'seller');
  
  const matches: Match[] = [];

  for (const buyer of buyerLeads) {
    for (const seller of sellerLeads) {
      const score = await calculateMatchScore(buyer, seller);
      // Only include matches with a score of 50 or higher
      if (score >= 50) {
        matches.push({ buyer, seller, score });
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, 10); // Return top 10 matches
}

async function calculateMatchScore(buyer: RealEstateLead, seller: RealEstateLead): Promise<number> {
  // Base score starts at 100
  let score = 100;

  // Exact match for BHK: +50 points, 1 BHK difference: -25 points, 2+ BHK difference: -50 points
  const bhkDifference = Math.abs(buyer.bedrooms - seller.bedrooms);
  if (bhkDifference === 0) score += 50;
  else if (bhkDifference === 1) score -= 25;
  else score -= 50;

  // Exact match for area: +50 points, otherwise -25 points
  if (buyer.area.toLowerCase() === seller.area.toLowerCase()) {
    score += 50;
  } else {
    score -= 25;
  }

  // Price difference
  const priceDifference = Math.abs(buyer.price - seller.price);
  const percentageDifference = priceDifference / buyer.price;

  if (percentageDifference <= 0.05) score += 30; // Within 5%
  else if (percentageDifference <= 0.10) score += 15; // Within 10%
  else if (percentageDifference <= 0.20) score -= 15; // Within 20%
  else score -= 30; // More than 20% difference

  // Ensure the score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return score;
}

