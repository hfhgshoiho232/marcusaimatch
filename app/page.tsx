import MatchList from '../components/MatchList';
import GroupSelector from '../components/GroupSelector';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Real Estate AI Matcher (Demo for Marcus)</h1>
      <p className="mb-8 text-gray-600">This is a trial version created for Marcus by TSM that uses simulated real estate WhatsApp groups and a mock AI API. As of now real API key is not required.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <GroupSelector />
        <MatchList />
      </div>
    </main>
  );
}

