import { saveComment, getComment } from "../utils/storage.js";

export function initComments() {
  const modal = document.getElementById("comment-modal");
  const modalTitle = document.getElementById("modal-title");
  const commentText = document.getElementById("comment-text");
  const saveBtn = document.getElementById("save-comment");
  const closeBtn = document.getElementById("close-modal");

  let currentId = null;

  // Otwieranie modala
  document.querySelectorAll(".add-comment-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.closest(".secondary").dataset.id;
      currentId = id;
      modalTitle.textContent = `Komentarz do ${id}`;
      commentText.value = getComment(id);
      modal.classList.remove("hidden");
    });
  });

  // Zapis komentarza
  saveBtn.addEventListener("click", () => {
    if (currentId) {
      saveComment(currentId, commentText.value.trim());
      modal.classList.add("hidden");
      alert(`Zapisano komentarz dla ${currentId}`);
    }
  });

  // Zamknięcie modala
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

window.addEventListener("DOMContentLoaded", initComments);
