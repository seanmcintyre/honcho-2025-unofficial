import React, { useState, useEffect } from "react";
import { getFavorites, toggleFavorite } from "../utils/favorites";

export function Favs({ events }) {
  const [favorites, setFavorites] = useState(new Set());
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  // Load favorites and filter events
  useEffect(() => {
    const loadFavorites = () => {
      const favIds = getFavorites();
      const favSet = new Set(favIds);
      setFavorites(favSet);
      
      // Filter events to only show favorites
      const filteredEvents = events.filter(event => favSet.has(event.id));
      setFavoriteEvents(filteredEvents);
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

    // Update favorite events list
    if (!newState) {
      setFavoriteEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  if (favoriteEvents.length === 0) {
    return (
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">YOUR FAVORITES</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">♡</div>
          <div className="text-gray-400 text-lg mb-2">No favorites yet</div>
          <div className="text-gray-500 text-sm">
            Go to Events and tap the ♡ to add your favorite events
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">YOUR FAVORITES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favoriteEvents.map((event) => (
          <div key={event.id} className="bg-gray-700 p-4 rounded relative">
            <button
              onClick={() => handleToggleFavorite(event.id)}
              className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Remove from favorites"
            >
              <span className="text-sm text-red-400">
                ♥
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