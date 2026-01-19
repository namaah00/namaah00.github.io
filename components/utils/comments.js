/**
 * dodanie lub zaktualizowanie komentarza dla danej komórki(zachowuje rating)
 * @param {Object} comments - aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @param {string} title - tytuł
 * @param {string} content - treść
 * @param {Array} images - obrazy
 * @returns {Object} - nowy obiekt komentarzy
 */
export function saveComment(comments, id, title, content, images = []) {
  const existingRating = comments[id]?.rating ?? null;
  
  return {
    ...comments,
    [id]: { 
      title, 
      content, 
      images, 
      rating: existingRating 
    }
  };
}

/**
 * Usuwanie komentarza dla danej kmórki
 * @param {Object} comments - aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @returns {Object} - nowy obiekt komentarzy
 */
export function deleteComment(comments, id) {
  const newComments = { ...comments };
  delete newComments[id];
  return newComments;
}

/**
 * Dodanie lub zaktualizowanie oceny dla danej komorki. Jeśli komentarz nie istnieje, tworzy pusty rekord z samym rating
 * @param {Object} comments - aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @param {number} rating - ocena (0-5)
 * @returns {Object} - nowy obiekt komentarzy
 */
export function saveRating(comments, id, rating) {
  const existing = comments[id] || { title: '', content: '', images: [] };
  
  return {
    ...comments,
    [id]: { 
      ...existing, 
      rating 
    }
  };
}

/**
* usuwanie oceny (zachowuje komentarz), ocena nie jest usuwana całkowicie, tylko ustawiana na null,
jeśli komentarz nie isntnieje, zwraca oryginalny obiekt
 * @param {Object} comments - aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @returns {Object} - nowy obiekt komentarzy
 */
export function deleteRating(comments, id) {
  if (!comments[id]) return comments;
  
  const { rating, ...rest } = comments[id];
  
  return {
    ...comments,
    [id]: { 
      ...rest, 
      rating: null 
    }
  };
}

/**
 * Zliczanie komentarzy, uwzględnia wszystkie komentarze, nie sprawdza czy mają rating
 * @param {Object} comments - obiekt komentarzy
 * @returns {number}
 */
export function countComments(comments) {
  return Object.keys(comments).length;
}
