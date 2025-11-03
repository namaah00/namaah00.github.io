const STORAGE_KEY = "comments";

export function getComments() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export function saveComment(id, text) {
  const comments = getComments();
  comments[id] = text;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export function getComment(id) {
  const comments = getComments();
  return comments[id] || "";
}
