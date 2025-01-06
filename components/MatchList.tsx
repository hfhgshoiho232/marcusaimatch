import { getMatches } from '../lib/matchmaking';

export default async function MatchList() {
  const matches = await getMatches();

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Potential Real Estate Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {matches.map((match, index) => (
            <li key={index} className="py-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{match.buyer.bedrooms} BHK in {match.buyer.area}</p>
                  <p className="text-sm text-gray-500">Buyer's budget: ${match.buyer.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Group: {match.buyer.groupName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{match.seller.bedrooms} BHK in {match.seller.area}</p>
                  <p className="text-sm text-gray-500">Seller's ask: ${match.seller.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Group: {match.seller.groupName}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">Match Score: {match.score.toFixed(2)}</p>
              <p className="mt-1 text-xs text-gray-500">
                BHK Difference: {Math.abs(match.buyer.bedrooms - match.seller.bedrooms)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Area Match: {match.buyer.area.toLowerCase() === match.seller.area.toLowerCase() ? 'Exact' : 'Different'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Price Difference: ${(match.seller.price - match.buyer.price).toLocaleString()} 
                ({(((match.seller.price - match.buyer.price) / match.buyer.price) * 100).toFixed(2)}%)
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

