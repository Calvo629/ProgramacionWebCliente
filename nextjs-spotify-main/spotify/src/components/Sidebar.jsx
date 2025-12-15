// Este componente Sidebar muestra la barra lateral de navegación de la app
'use client';


// Importamos Link para navegación y hooks para saber la ruta actual y navegar
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';


// Componente principal de la barra lateral
export default function Sidebar() {
  const pathname = usePathname(); // Ruta actual
  const router = useRouter();     // Para navegar entre páginas

  // Función para saber si un enlace está activo (resalta el botón)
  const isActive = (path) => pathname === path;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-950/90 via-purple-900/90 to-blue-950/90 backdrop-blur-md p-4 border-r-2 border-cyan-400/30 shadow-xl">
      {/* Imagen de título de la app */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/IMG/title.png"
          alt="Calvo Galaxy"
          className="w-48 max-w-full h-auto"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Música de fondo que suena en toda la app (oculta) */}
      <audio src="/song.mp3" autoPlay loop hidden />

      {/* Navegación principal con enlaces a cada sección */}
      <nav className="space-y-2">
        {/* Enlace a Home (dashboard principal) */}
        <Link 
          href="/dashboard"
          className={`flex items-center p-2 rounded-xl transition-all ${
            isActive('/dashboard') 
              ? 'bg-cyan-400/80 text-white shadow-lg shadow-cyan-500/50' 
              : 'text-white hover:text-yellow-300 hover:bg-purple-800/30 hover:border-l-4 hover:border-cyan-400'
          }`}
        >
          Home
        </Link>

        {/* Enlace a artistas favoritos */}
        <Link 
          href="/dashboard/artists"
          className={`flex items-center p-2 rounded-xl transition-all ${
            isActive('/dashboard/artists') 
              ? 'bg-cyan-400/80 text-white shadow-lg shadow-cyan-500/50' 
              : 'text-white hover:text-yellow-300 hover:bg-purple-800/30 hover:border-l-4 hover:border-cyan-400'
          }`}
        >
          Artistas
        </Link>

        {/* Enlace a canciones favoritas */}
        <Link 
          href="/dashboard/tracks"
          className={`flex items-center p-2 rounded-xl transition-all ${
            isActive('/dashboard/tracks') 
              ? 'bg-cyan-400/80 text-white shadow-lg shadow-cyan-500/50' 
              : 'text-white hover:text-yellow-300 hover:bg-purple-800/30 hover:border-l-4 hover:border-cyan-400'
          }`}
        >
          Tracks
        </Link>

        {/* Enlace a géneros musicales favoritos */}
        <Link
          href="/dashboard/generos"
          className={`flex items-center p-2 rounded-xl transition-all ${
            isActive('/dashboard/generos')
              ? 'bg-cyan-400/80 text-white shadow-lg shadow-cyan-500/50'
              : 'text-white hover:text-yellow-300 hover:bg-purple-800/30 hover:border-l-4 hover:border-cyan-400'
          }`}
        >
          Géneros
        </Link>

        {/* Enlace a décadas favoritas */}
        <Link
          href="/dashboard/decadas"
          className={`flex items-center p-2 rounded-xl transition-all ${
            isActive('/dashboard/decadas')
              ? 'bg-cyan-400/80 text-white shadow-lg shadow-cyan-500/50'
              : 'text-white hover:text-yellow-300 hover:bg-purple-800/30 hover:border-l-4 hover:border-cyan-400'
          }`}
        >
          Décadas
        </Link>

        {/* Enlace a popularidad (slider) */}
        <Link
          href="/dashboard/popularidad"
          className={`flex items-center p-2 rounded-xl transition-all ${
            isActive('/dashboard/popularidad')
              ? 'bg-cyan-400/80 text-white shadow-lg shadow-cyan-500/50'
              : 'text-white hover:text-yellow-300 hover:bg-purple-800/30 hover:border-l-4 hover:border-cyan-400'
          }`}
        >
          Popularidad
        </Link>
        
        {/* Enlace a playlists generadas y guardadas */}
        <Link
          href="/dashboard/playlist"
          className={`flex items-center p-2 rounded-xl transition-all ${
            isActive('/dashboard/playlist')
              ? 'bg-cyan-400/80 text-white shadow-lg shadow-cyan-500/50'
              : 'text-white hover:text-yellow-300 hover:bg-purple-800/30 hover:border-l-4 hover:border-cyan-400'
          }`}
        >
          Playlists
        </Link>
      </nav>

      {/* Botón de logout abajo del todo, limpia localStorage y vuelve al login */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center">
        <button
          onClick={() => {
            localStorage.clear(); // Borra todos los datos guardados
            router.push("http://localhost:3000/"); // Redirige al login
          }}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-700 transition-all shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}