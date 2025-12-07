'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';

export default function Header() {
  const router = useRouter();
  
  // Estados para almacenar información
  const [buscar, setBuscar] = useState('');          // Texto del buscador
  const [resultados, setResultados] = useState([]);  // Canciones encontradas
  const [mostrar, setMostrar] = useState(false);     // Mostrar u ocultar resultados
  const [usuario, setUsuario] = useState(null);      // Info del usuario logueado

  // Se ejecuta cuando carga el componente para obtener info del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      const token = getAccessToken();
      if (!token) return;

      // Petición para obtener los datos del usuario actual
      const res = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsuario(data);
    };

    fetchUsuario();
  }, []);

  // Se ejecuta cada vez que cambia el texto del buscador
  useEffect(() => {
    // Si el buscador está vacío, limpia los resultados
    if (!buscar.trim()) {
      setResultados([]);
      setMostrar(false);
      return;
    }

    // Espera 300ms después de que el usuario deje de escribir
    const timer = setTimeout(() => {
      fetchCanciones(buscar);
    }, 300);

    // Limpia el timer si el usuario sigue escribiendo
    return () => clearTimeout(timer);
  }, [buscar]);

  // Función para buscar canciones en Spotify
  const fetchCanciones = async (query) => {
    const token = getAccessToken();
    if (!token) return;

    // Petición a la API de Spotify para buscar canciones
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    
    // Mapea los resultados para quedarnos solo con lo que necesitamos
    const canciones = (data.tracks?.items || []).map(t => ({
      id: t.id,
      nombre: t.name,
      artista: t.artists[0]?.name,
      img: t.album?.images?.[0]?.url
    }));
    
    setResultados(canciones);
    setMostrar(canciones.length > 0);
  };

  // Función cuando haces click en una canción de los resultados
  const handleClick = (cancionId) => {
    setMostrar(false);           // Oculta los resultados
    setBuscar('');               // Limpia el buscador
    setResultados([]);           // Limpia los resultados
    router.push(`/dashboard/tracks/${cancionId}`);  // Navega a la página de la canción
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between z-10">
      
      {/* Buscador de canciones */}
      <div className="flex-1 max-w-md relative">
        <input
          type="text"
          placeholder="Buscar canciones..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          onFocus={() => buscar.trim() && setMostrar(true)}
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Dropdown con resultados de búsqueda */}
        {mostrar && resultados.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
            {resultados.map((cancion, i) => (
              <div
                key={i}
                onClick={() => handleClick(cancion.id)}
                className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer"
              >
                {/* Imagen del álbum */}
                <img src={cancion.img} alt="" className="w-12 h-12 rounded object-cover" />
                <div>
                  {/* Nombre de la canción */}
                  <p className="text-white">{cancion.nombre}</p>
                  {/* Nombre del artista */}
                  <p className="text-gray-400 text-xs">{cancion.artista}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Foto de perfil del usuario */}
      <div className="flex items-center gap-4">
        {usuario?.images?.[0]?.url && (
          <img 
            src={usuario.images[0].url}
            alt={usuario.display_name}
            className="w-12 h-12 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-green-500"
          />
        )}
      </div>
      
    </header>
  );
}