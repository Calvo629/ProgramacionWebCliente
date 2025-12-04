'use client';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
      <h1 className="text-4xl font-bold text-white mb-8">🎵 Dashboard</h1>
      
      {/* Bienvenida */}
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        <h2 className="text-2xl text-white mb-4">¡Bienvenido!</h2>
        <p className="text-gray-400">Usa el menú lateral para explorar.</p>
      </div>

    </div>
  );
}