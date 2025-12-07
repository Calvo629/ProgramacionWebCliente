'use client';

import { useEffect, useState } from 'react';
import { getAccessToken } from '@/lib/auth';

export default function TrackCard({ trackId }) {
  // Estados para almacenar la información
  const [track, setTrack] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  // Se ejecuta cuando el componente carga o cambia el trackId
  useEffect(() => {
    const fetchData = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        // Petición para obtener los datos de la canción
        const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const trackData = await trackRes.json();
        setTrack(trackData);

        // Petición para obtener los datos del artista principal
        if (trackData.artists?.[0]?.id) {
          const artistRes = await fetch(`https://api.spotify.com/v1/artists/${trackData.artists[0].id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const artistData = await artistRes.json();
          setArtist(artistData);
        }
      } catch (error) {
        console.error('Error al cargar la canción:', error);
      } finally {
        setLoading(false);
      }
    };

    if (trackId) fetchData();
  }, [trackId]);

  // Pantalla de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Cargando...</p>
      </div>
    );
  }

  // Si no hay canción
  if (!track) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white">No se encontró la canción</p>
      </div>
    );
  }

  // Calcular duración en formato MM:SS
  const duracion = `${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
      
      {/* Sección principal */}
      <div className="bg-gray-800 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Imagen del álbum */}
          <img
            src={track.album?.images?.[0]?.url}
            alt={track.name}
            className="w-full sm:w-64 md:w-64 lg:w-72 h-64 rounded-lg"
          />

          {/* Información de la canción */}
          <div className="flex-1">
            <p className="text-green-400 text-sm uppercase mb-2">Canción</p>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{track.name}</h1>
            
            {/* Artista, álbum, año */}
            <div className="text-gray-300 text-sm mb-4">
              <span>{track.artists?.map(a => a.name).join(', ')}</span>
              <span> • </span>
              <span>{track.album?.name}</span>
              <span> • </span>
              <span>{track.album?.release_date?.split('-')[0]}</span>
              <span> • </span>
              <span>{duracion}</span>
            </div>

            {/* Controles de reproducción */}
            <div className="bg-gray-700 rounded-lg p-6">
              {/* Botones de control */}
              <div className="flex justify-center items-center gap-6 mb-4">
                <button className="text-gray-400 hover:text-white transition">
                  <span>◄◄</span>
                </button>
                <button className="bg-green-500 hover:bg-green-400 text-black rounded-full w-14 h-14 flex items-center justify-center transition">
                    <span>▶</span>
                </button>
                <button className="text-gray-400 hover:text-white transition">
                  <span>►►</span>
                </button>
              </div>
              
              {/* Barra de progreso */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xs font-mono">0:00</span>
                <div className="flex-1 bg-gray-600 rounded-full h-1.5 cursor-pointer group">
                  <div className="bg-green-500 h-full rounded-full w-0 group-hover:bg-green-400 transition"></div>
                </div>
                <span className="text-gray-400 text-xs font-mono">{duracion}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* Información del artista */}
      {artist && (
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Sobre el artista</h2>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            
            {/* Foto del artista */}
            <img
              src={artist.images?.[0]?.url}
              alt={artist.name}
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full mx-auto md:mx-0"
            />
            
            <div className="flex-1">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center md:text-left">{artist.name}</h3>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-xs sm:text-sm">Seguidores</p>
                  <p className="text-white text-lg sm:text-xl font-bold">{artist.followers?.total.toLocaleString()}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-xs sm:text-sm">Popularidad</p>
                  <p className="text-white text-lg sm:text-xl font-bold">{artist.popularity}/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}