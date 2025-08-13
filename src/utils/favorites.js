// Favorites management with localStorage
const FAVORITES_KEY = 'honcho-favorites';

export function getFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

export function isFavorite(eventId) {
  const favorites = getFavorites();
  return favorites.includes(eventId);
}

export function toggleFavorite(eventId) {
  try {
    const favorites = getFavorites();
    const isCurrentlyFavorite = favorites.includes(eventId);
    
    let newFavorites;
    if (isCurrentlyFavorite) {
      newFavorites = favorites.filter(id => id !== eventId);
    } else {
      newFavorites = [...favorites, eventId];
    }
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return !isCurrentlyFavorite; // return new state
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
}

export function addFavorite(eventId) {
  const favorites = getFavorites();
  if (!favorites.includes(eventId)) {
    favorites.push(eventId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(eventId) {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(id => id !== eventId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
}