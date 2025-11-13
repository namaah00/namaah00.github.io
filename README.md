# 🛡️ DISARM Navigator - System Analizy Taktyk Cyberbezpieczeństwa

Interaktywna aplikacja webowa do analizy i dokumentacji taktyk oraz technik cyberbezpieczeństwa, inspirowana interfejsem DISARM Navigator.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Główne funkcje

- **Matryca hierarchiczna (L1-L3)** - Taktyki → Primary Elements → Secondary Elements
- **System komentarzy** - z tytułami, treścią i załącznikami obrazów
- **System ocen** - 0-5 gwiazdek dla PE 001 (Ocena treści) i PE 002 (Ocena Źródła)
- **Eksport do JPEG** - wizualizacja całej matrycy
- **Raport PDF** - pełny raport z komentarzami i obrazami (z zachowaniem proporcji!)
- **Export/Import JSON** - backup i przywracanie danych
- **Wielojęzyczność** - Polski 🇵🇱 i Angielski 🇬🇧
- **localStorage** - automatyczny zapis danych

---

## 🛠️ Technologie

- **React 18.3.1** + **Vite 5.4.11**
- **JavaScript/JSX** (główne pliki) + **TypeScript** (komponenty UI)
- **html2canvas** - eksport do JPEG
- **jsPDF** - generowanie PDF
- **Lucide React** - ikony
- **Tailwind CSS** - stylowanie

---

## 📦 Instalacja

```bash
# Sklonuj repozytorium
git clone https://github.com/twoj-username/disarm-navigator.git
cd disarm-navigator

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Otwórz http://localhost:5173
```

### Budowanie produkcyjne
```bash
npm run build
npm run preview
```

---

## 🎨 Jak używać

### Dodawanie komentarzy
1. Kliknij na Secondary Element (przycisk `+` lub ikona `💬`)
2. Wypełnij formularz (tytuł, treść, obrazy - opcjonalnie)
3. Kliknij "Zapisz"
4. Element będzie oznaczony: `💬` (komentarz) lub `💬📎` (komentarz z obrazem)

### Ocenianie PE 001 i PE 002
1. Kliknij na **PE 001** lub **PE 002**
2. Wybierz ocenę **0-5 gwiazdek**
3. Ocena pojawi się w nagłówku: **[⭐⭐⭐⭐☆]**

### Dodawanie obrazów
- W dialogu komentarza kliknij **"Wybierz pliki"**
- Obsługiwane formaty: JPG, PNG, GIF, WebP
- **Limit**: 2MB na obraz
- Kliknij **✕** aby usunąć obraz

### Eksport danych

**JPEG:**
```
📷 Eksportuj JPEG → disarm-matrix.jpg
```

**PDF:**
```
📄 Generuj raport PDF → raport.pdf
```
- Zawiera wszystkie komentarze
- Obrazy z zachowanymi proporcjami (max 80×100mm)
- Automatyczny podział na strony

**JSON:**
```
💾 Eksportuj JSON → disarm-data.json
```

**Import JSON:**
```
📂 Importuj JSON → wybierz plik .json
```

### Przełączanie języka
```
🌐 PL | EN - kliknij w prawym górnym rogu
```

---

## 📁 Struktura projektu

```
disarm-navigator/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions - auto deploy
├── components/
│   ├── CommentDialog.jsx         # Dialog komentarzy
│   ├── HelpDialog.jsx            # Dialog pomocy
│   ├── MatrixView.jsx            # Wizualizacja matrycy
│   ├── RatingDialog.jsx          # Dialog oceniania
│   ├── Toast.jsx                 # Powiadomienia
│   ├── matrixData.js             # Dane matrycy L1-L3
│   └── translations.js           # Tłumaczenia PL/EN
├── dist/                         # Build output (generowany)
├── node_modules/                 # Zależności (generowany)
├── styles/
│   └── simple.css                # Proste style
├── .gitignore                    # Git ignore
├── App.jsx                       # Główna aplikacja (JS)
├── index.html                    # HTML template
├── LICENSE.txt                   # Licencja MIT
├── main.jsx                      # Entry point
├── package.json                  # NPM config
├── package-lock.json             # NPM lock
├── README.md                     # Dokumentacja (ten plik)
└── vite.config.js                # Vite config
```

---

## 🌐 Wielojęzyczność

### Dodawanie nowego języka

**1. Edytuj `/components/translations.js`:**
```javascript
export const translations = {
  pl: { /* ... */ },
  en: { /* ... */ },
  de: {  // NOWY JĘZYK
    matrixTitle: 'DISARM Matrix',
    addComment: 'Kommentar hinzufügen',
    // ... dodaj wszystkie klucze
  }
};
```

**2. Dodaj przycisk w `App.jsx`:**
```jsx
<button onClick={() => setLanguage('de')}>🌐 DE</button>
```

---

## 📷 Obrazy w komentarzach

- Obrazy są konwertowane do **Base64** i zapisywane w localStorage
- Eksportowane w JSON i PDF
- **v2.0:** Automatyczne zachowanie proporcji w PDF
  - Max szerokość: 80mm
  - Max wysokość: 100mm
  - Aspect ratio zachowane

**Przykłady:**
- Obraz 1920×1080px (16:9) → **80mm × 45mm** w PDF
- Obraz 1080×1920px (9:16) → **56mm × 100mm** w PDF

---

## 🔧 Rozwój

### Dostępne skrypty
```bash
npm run dev       # Dev server
npm run build     # Build produkcyjny
npm run preview   # Podgląd buildu
```

---

## 📝 Licencja

MIT License - Copyright (c) 2025

---

## 🤝 Współpraca

Pull Requesty i Issues są mile widziane!

1. Fork repozytorium
2. Utwórz branch (`git checkout -b feature/NowaFunkcja`)
3. Commit (`git commit -m 'Dodano nową funkcję'`)
4. Push (`git push origin feature/NowaFunkcja`)
5. Otwórz Pull Request

---

<div align="center">

**⭐ Jeśli projekt Ci się podoba, zostaw gwiazdkę na GitHubie! ⭐**

Made with ❤️ using React & Vite

</div>
