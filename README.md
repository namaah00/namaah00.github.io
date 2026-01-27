# Model Weryfikacji Informacji (Information Verification Model)

Aplikacja webowa będąca implementacją modelu weryfikacji informacji. System umożliwia strukturyzację danych w hierarchicznej strukturze (warstwy L1-L3), ocenę wiarygodności, zarządzanie źródłami oraz generowanie raportów analitycznych.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)

---

## Główne funkcje

- **Hierarchiczna struktura warstw L1-L3** - trójpoziomowa struktura elementów nadrzędnych (PE) i podrzędnych (SE) weryfikacji informacji
- **System ocen (0-5) dla warstwy L1** - precyzyjne ocenianie elementów podrzędnych warstwy 1 według ustalonych kryteriów
- **Interaktywne komentarze** - system notatek z możliwością załączania materiałów graficznych
- **Modularny silnik PDF** - 10 wyspecjalizowanych modułów do generowania raportów
- **Wykresy radarowe** - wizualna reprezentacja ocen i rozkładu elementów (RadarChartDialog)
- **Wielojęzyczność** - pełne wsparcie dla języka polskiego i angielskiego
- **Eksport/Import JSON** - pełna mobilność danych projektowych
- **Tryb ciemny/jasny** - interfejs zoptymalizowany pod kątem komfortu pracy

---

## Technologie

### Stack technologiczny
- **Frontend:** React 18.3.1 (Vite 5.4.11)
- **Stylizacja:** Tailwind CSS (v4)
- **Język:** JavaScript / JSX

### Kluczowe biblioteki
- **jsPDF & html2canvas:** Zaawansowane generowanie raportów PDF
- **Recharts:** Renderowanie wykresów radarowych
- **Lucide React:** System ikon
- **Sonner:** System powiadomień (Toast)

---

## Architektura i struktura plików

Projekt bazuje na architekturze komponentowej z wyraźnym podziałem odpowiedzialności (Single Responsibility Principle).

```
/
├── /components/
│   ├── /dialogs/              # Zdecentralizowane komponenty dialogowe (6 plików)
│   ├── /pdf/                  # Moduły logiki generowania raportów (10 plików)
│   ├── /utils/                # Funkcje pomocnicze i stałe
│   ├── MatrixView.jsx         # Widok główny matrycy
│   └── translations.js        # Konfiguracja wielojęzyczności
│
├── /imports/                  # Zasoby graficzne i ikony
├── App.jsx                    # Główny kontroler aplikacji
└── vite.config.ts            # Konfiguracja środowiska budowania
```

### Moduł PDF (System modularny)
Logika generowania PDF została wydzielona do 10 wyspecjalizowanych modułów w `/components/pdf/`, co zapewnia wysoką reużywalność kodu i łatwość konserwacji (pdfCore, pdfTitlePage, pdfChartGenerator, itd.).

---

## Instalacja i uruchomienie

```bash
# Sklonuj repozytorium
git clone https://github.com/twoj-uzytkownik/model-weryfikacji-informacji.git
cd model-weryfikacji-informacji

# Zainstaluj zależności
npm install

# Uruchom w trybie deweloperskim
npm run dev
```

---

## Licencja

Apache License 2.0  
Copyright (c) 2026 Model Weryfikacji Informacji (Information Verification Model)
