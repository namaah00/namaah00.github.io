/**
 * Dodaj lub zaktualizuj komentarz (zachowuje rating)
 * @param {Object} comments - Aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @param {string} title - Tytuł
 * @param {string} content - Treść
 * @param {Array} images - Obrazy
 * @returns {Object} - Nowy obiekt komentarzy
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
 * Usuń komentarz
 * @param {Object} comments - Aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @returns {Object} - Nowy obiekt komentarzy
 */
export function deleteComment(comments, id) {
  const newComments = { ...comments };
  delete newComments[id];
  return newComments;
}

/**
 * Dodaj lub zaktualizuj rating
 * @param {Object} comments - Aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @param {number} rating - Ocena (0-5)
 * @returns {Object} - Nowy obiekt komentarzy
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
 * Usuń rating (zachowuje komentarz)
 * @param {Object} comments - Aktualny obiekt komentarzy
 * @param {string} id - ID komórki
 * @returns {Object} - Nowy obiekt komentarzy
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
 * Zlicz komentarze
 * @param {Object} comments - Obiekt komentarzy
 * @returns {number}
 */
export function countComments(comments) {
  return Object.keys(comments).length;
}
