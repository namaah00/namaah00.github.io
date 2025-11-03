import { saveComment, getComment } from "../utils/storage.js";

export function initComments() {
  const modal = document.getElementById("comment-modal");
  const modalTitle = document.getElementById("modal-title");
  const commentText = document.getElementById("comment-text");
  const saveBtn = document.getElementById("save-comment");
  const closeBtn = document.getElementById("close-modal");

  let currentId = null; // aktualna komórka, do której dodajemy komentarz

  // 🔹 1. Reakcja na kliknięcie "Add Comment"
  document.querySelectorAll(".add-comment-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const cell = e.target.closest(".secondary");  // najbliższy element .secondary
      currentId = cell.dataset.id;                  // np. "003.2"
      const title = cell.querySelector("p").textContent; // np. "003.2 Cel przekazu"

      // ustawiamy tytuł w modalu
      modalTitle.textContent = `Komentarz do: ${title}`;

      // jeśli wcześniej zapisano komentarz — wczytaj go
      commentText.value = getComment(currentId);

      // pokaż modal
      modal.classList.remove("hidden");
    });
  });

  // 🔹 2. Zapis komentarza
  saveBtn.addEventListener("click", () => {
    if (currentId) {
      const text = commentText.value.trim();

      // zapis do localStorage
      saveComment(currentId, text);

      // zamknij modal
      modal.classList.add("hidden");

      // czyść pole tekstowe
      commentText.value = "";

      // prosty komunikat
      alert(`Zapisano komentarz dla: ${currentId}`);
    }
  });

  // 🔹 3. Zamknięcie modala (bez zapisu)
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    commentText.value = "";
  });

  // 🔹 4. Zamknięcie po kliknięciu w tło modala
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      commentText.value = "";
    }
  });
}

// Uruchomienie po załadowaniu strony
window.addEventListener("DOMContentLoaded", initComments);
