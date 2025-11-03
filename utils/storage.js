const STORAGE_KEY = "comments";

export function getComments() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export function saveComment(id, text) {
  const data = getComments();
  data[id] = text;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getComment(id) {
  return getComments()[id] || "";
}
