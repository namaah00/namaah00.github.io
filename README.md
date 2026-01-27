# Model Weryfikacji Informacji (Information Verification Model)

Aplikacja webowa będąca implementacją modelu weryfikacji informacji. System umożliwia strukturyzację danych w hierarchicznej strukturze (warstwy L1-L3), ocenę wiarygodności, zarządzanie źródłami oraz generowanie raportów analitycznych.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)

---

##  Główne funkcjonalności

###  Zarządzanie strukturą danych (Warstwy L1-L3)
- **Trójpoziomowa hierarchia (L1–L3)** - wizualizacja danych.
- **Dynamiczne mapowanie danych** - automatyczne odświeżanie struktury oraz stanów komórek na podstawie wprowadzonych informacji.
- **Interaktywna nawigacja** - płynny widok główny oraz dedykowany widok źródeł dodawanych przez użytkownika (`SourcesView`).

###  System ocen i opiniowania
- **Skala ocen 0–5** - ocenianie elementów weryfikacyjnych według ustalonych kryteriów.
- **Interaktywne komentarze** - notatki tekstowe z możliwością załączania materiałów graficznych (obrazy).
- **Pełny system dodawania źródeł dla warstwy L3** - zarządzanie źródłami, dowodami oraz szczegółowymi rekordami weryfikacyjnymi.

###  Analityka wizualna i UX
- **Wykresy radarowe (Radar Charts)** - dynamiczna prezentacja ocen w dedykowanym dialogu analitycznym (`RadarChartDialog`).
- **System powiadomień (Toast)** - czytelne informacje zwrotne o akcjach użytkownika.
- **Tryb jasny / ciemny** - interfejs zoptymalizowany pod kątem komfortu pracy.
- **Wielojęzyczność** - pełne wsparcie dla języka polskiego i angielskiego z przełączaniem w czasie rzeczywistym.

###  Zaawansowane raportowanie (PDF)
- **Modularny silnik PDF** - 10 wyspecjalizowanych modułów (m.in. `pdfCore`, `pdfChartGenerator`) do generowania raportów.
- **Automatyczne wykresy w PDF** - radarowe wizualizacje generowane bezpośrednio w dokumentach.
- **Konfigurowalny eksport** - możliwość wprowadzenia tytułu i atora raportu przed wygenerowaniem raportu.

###  Zarządzanie danymi i trwałość
- **Auto-zapis (Persistence)** - synchronizacja stanu aplikacji z `localStorage`.
- **Eksport / Import JSON** - tworzenie kopii zapasowych i przenoszenie projektów między instancjami aplikacji.
- **Izolacja danych sesji** - bezpieczeństwo danych na poziomie przeglądarki użytkownika.


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

