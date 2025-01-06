interface RealEstateLead {
  id: string;
  type: 'buyer' | 'seller';
  area: string;
  bedrooms: 1 | 2 | 3 | 4;
  price: number;
  message: string;
}

function generateRandomLead(id: number): RealEstateLead {
  const type = Math.random() > 0.5 ? 'buyer' : 'seller';
  const areas = ['Downtown', 'Suburb', 'Beachfront', 'Mountain View', 'City Center'];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const bedrooms = [1, 2, 3, 4][Math.floor(Math.random() * 4)] as 1 | 2 | 3 | 4;
  const basePrice = 100000 + Math.floor(Math.random() * 900000);
  const priceVariation = type === 'buyer' ? -Math.random() * 50000 : Math.random() * 50000;
  const price = Math.round(basePrice + priceVariation);

  const message = type === 'buyer'
    ? `Looking to buy a ${bedrooms} BHK in ${area}. Budget around $${price.toLocaleString()}.`
    : `Selling a ${bedrooms} BHK in ${area}. Asking $${price.toLocaleString()}.`;

  return {
    id: `lead_${id}`,
    type,
    area,
    bedrooms,
    price,
    message
  };
}

export const realEstateLeads: RealEstateLead[] = Array.from({ length: 100 }, (_, i) => generateRandomLead(i + 1));

