import React, { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "../../utils/favorites";

export function Details({ events }) {
  const [favorites, setFavorites] = useState(new Set());

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = () => {
      const favs = new Set();
      events.forEach(event => {
        if (isFavorite(event.id)) {
          favs.add(event.id);
        }
      });
      setFavorites(favs);
    };
    loadFavorites();
  }, [events]);

  const handleToggleFavorite = (eventId) => {
    const newState = toggleFavorite(eventId);
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newState) {
        newFavs.add(eventId);
      } else {
        newFavs.delete(eventId);
      }
      return newFavs;
    });
  };

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">EVENT DETAILS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-700 p-4 rounded relative">
            <button
              onClick={() => handleToggleFavorite(event.id)}
              className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label={favorites.has(event.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <span className={`text-sm transition-colors ${
                favorites.has(event.id) ? 'text-red-400' : 'text-white/50'
              }`}>
                {favorites.has(event.id) ? '♥' : '♡'}
              </span>
            </button>
            <div className="font-bold text-white mb-1 pr-8">{event.title}</div>
            <div className="text-sm text-gray-300 mb-2">
              {event.day_program} • {event.time} • {event.stage}
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">
              {event.description}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
