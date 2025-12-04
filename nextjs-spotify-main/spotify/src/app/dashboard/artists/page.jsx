import ArtistWidget from "@/components/widgets/ArtistWidget";

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
      <h1 className="text-4xl font-bold text-white mb-8">🎤 Artistas</h1>
      <ArtistWidget />
    </div>
  );
}