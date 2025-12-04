'use client';

import { useState, useEffect } from "react";
import { getAccessToken } from "@/lib/auth";

export default function ArtistWidget() {
  const [artists, setArtists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [buscar, setBuscar] = useState("");

  // Buscar artistas
  const fetchArtists = async (query) => {
    const token = getAccessToken();
    if (!token) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${query}&limit=8`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (!data.artists?.items) return;

    setArtists(data.artists.items.map((a) => ({
      id: a.id,
      name: a.name,
      image: a.images?.[0]?.url || "/default-image.jpg",
    })));
  };

  // Cargar artistas al inicio
  useEffect(() => {
    fetchArtists("genre:pop");
  }, []);

  // Seleccionar/deseleccionar
  const toggleSelect = (artist) => {
    setSelected((prev) =>
      prev.find((a) => a.id === artist.id)
        ? prev.filter((a) => a.id !== artist.id)
        : [...prev, artist]
    );
  };

  return (
    <div>
      {/* Buscador */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar artista..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchArtists(buscar)}
          className="flex-1 max-w-md px-4 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={() => fetchArtists(buscar)}
          className="px-6 py-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400"
        >
          Buscar
        </button>
      </div>

      {/* Artistas */}
      <div className="grid grid-cols-4 gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => toggleSelect(artist)}
            className={`p-4 rounded-xl cursor-pointer transition-all hover:scale-105 ${
              selected.find((s) => s.id === artist.id)
                ? "bg-green-600 ring-2 ring-green-400"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full aspect-square object-cover rounded-lg mb-2"
            />
            <p className="text-white text-center text-sm truncate">{artist.name}</p>
          </div>
        ))}
      </div>

      {/* Seleccionados */}
      {selected.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selected.map((a) => (
            <span key={a.id} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              {a.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}