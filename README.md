# 🛡️ DISARM Navigator - System Analizy Taktyk Cyberbezpieczeństwa

Interaktywna aplikacja webowa do analizy i dokumentacji taktyk oraz technik cyberbezpieczeństwa, inspirowana interfejsem DISARM Navigator.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)

---

## 🎯 Główne funkcje

- **Matryca hierarchiczna (L1-L3)** - Taktyki → Primary Elements → Secondary Elements
- **System komentarzy** - z tytułami, treścią i załącznikami obrazów
- **System ocen** - 0-5 gwiazdek dla PE 001 (Ocena treści) i PE 002 (Ocena Źródła)
- **Eksport do JPEG** - wizualizacja całej matrycy
- **Raport PDF** - pełny raport z komentarzami, obrazami i wykresami radarowymi
  - Strona tytułowa z autorem i datą
  - Nagłówki na wszystkich stronach (tytuł, autor, data DD.MM.YYYY)
  - Wykresy radarowe dla ocen PE 001 i PE 002
  - Obrazy z zachowanymi proporcjami
- **Export/Import JSON** - backup i przywracanie danych
- **Wielojęzyczność** - Polski 🇵🇱 i Angielski 🇬🇧
- **Tryb ciemny** - pełne wsparcie dla ciemnego motywu
- **localStorage** - automatyczny zapis danych

---

## 🛠️ Technologie

- **React 18.3.1** + **Vite 5.4.11**
- **JavaScript/JSX** (czysty JavaScript, bez TypeScript)
- **html2canvas** - eksport do JPEG
- **jsPDF** - generowanie PDF
- **Recharts** - wykresy radarowe
- **Lucide React** - ikony
- **CSS** - stylowanie

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

**✅ NOWOŚĆ v2.0:** Obrazy w PDF mają zachowane proporcje - brak zniekształceń!

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
│   ├── LandingPage.jsx           # Strona powitalna
│   ├── matrixData.js             # Dane matrycy L1-L3
│   ├── MatrixView.jsx            # Wizualizacja matrycy
│   ├── PDFConfigDialog.jsx       # Konfiguracja raportu PDF (tytuł, autor)
│   ├── pdfGenerator.js           # Generator raportów PDF (~750 linii)
│   ├── RadarChartDialog.jsx      # Dialog wykresu radarowego
│   ├── RatingDialog.jsx          # Dialog oceniania
│   ├── SourceDialog.jsx          # Dialog dodawania źródeł (PE 004)
│   ├── SourcesView.jsx           # Widok źródeł dla PE 004
│   ├── Toast.jsx                 # Powiadomienia
│   └── translations.js           # Tłumaczenia PL/EN
├── dist/                         # Build produkcyjny (generowany)
├── node_modules/                 # Zależności NPM (generowany)
├── styles/
│   └── simple.css                # Style CSS
├── .gitignore                    # Pliki ignorowane przez Git
├── App.jsx                       # Główna aplikacja
├── index.html                    # HTML template
├── LICENSE.txt                   # Licencja Apache 2.0
├── main.jsx                      # Entry point
├── package-lock.json             # NPM lock file
├── package.json                  # NPM config
├── README.md                     # Dokumentacja (ten plik)
└── vite.config.js                # Vite config
```

**Uwaga:** Katalogi `dist/` i `node_modules/` są generowane automatycznie i nie są commitowane do repozytorium.

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

## 📜 Historia zmian

### v2.1.0 (2025-01-18)
- ✅ **Nagłówki na wszystkich stronach PDF** (oprócz strony tytułowej)
  - Tytuł po lewej, autor na środku, data DD.MM.YYYY po prawej
  - Linia pozioma pod nagłówkiem
- ✅ **Ujednolicony format daty DD.MM.YYYY** w nagłówkach PDF
- ✅ **Pełny format daty na stronie tytułowej** (np. "18 stycznia 2026, 19:00")
- ✅ **Naprawiono wykresy radarowe** - usunięto polskie znaki diakrytyczne z etykiet
- ✅ **Wydzielono moduł pdfGenerator.js** (~750 linii) do `/components/`

### v2.0.0 (2025-01-13)
- ✅ **Naprawiono zniekształcone obrazy w PDF** - automatyczne zachowanie proporcji
- ✅ Dodano funkcję `getImageDimensions()` w App.jsx
- ✅ Customowy przycisk wyboru plików (wielojęzyczność)

### v1.5.0
- ✅ System wielojęzyczności (PL/EN)
- ✅ System ocen dla PE 001 i PE 002

### v1.3.0
- ✅ Dodawanie obrazów do komentarzy (Base64)

### v1.0.0
- ✅ Matryca L1-L3, komentarze, eksport JPEG/PDF/JSON

---

## 📝 Licencja

Apache License 2.0 - Copyright (c) 2025 DISARM Navigator Contributors

Zobacz plik [LICENSE.txt](LICENSE.txt) dla szczegółów.

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