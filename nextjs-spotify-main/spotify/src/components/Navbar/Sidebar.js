'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-black p-4">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white mb-8">
        🎵 Spotify
      </h1>

      {/* Navegación */}
      <nav className="space-y-2">
        {/* Home */}
        <Link 
          href="/dashboard"
          className={`flex items-center p-2 rounded-md transition-colors ${
            isActive('/dashboard') 
              ? 'bg-green-700 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <svg className="h-6 w-6 mr-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
          Home
        </Link>

        {/* Artistas */}
        <Link 
          href="/dashboard/artists"
          className={`flex items-center p-2 rounded-md transition-colors ${
            isActive('/dashboard/artists') 
              ? 'bg-green-700 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <svg className="h-6 w-6 mr-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
          Artistas
        </Link>
      </nav>

      {/* Botón Crear Playlist */}
      <button className="w-full mt-6 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-colors">
        + Crear Playlist
      </button>
    </div>
  );
}