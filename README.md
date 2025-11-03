# 🎯 System Analizy Informacji

Prosta aplikacja React do analizy taktyk i technik cyberbezpieczeństwa z interfejsem matrycowym.

## ✨ Funkcje

- ✅ Matryca 3-poziomowa (L1, L2, L3)
- ✅ Primary Elements (PE) i Secondary Elements (SE)
- ✅ Dodawanie komentarzy z tytułem i treścią
- ✅ Eksport do JPEG
- ✅ Generowanie PDF
- ✅ Eksport/Import JSON
- ✅ Licznik komentarzy

## 🚀 Szybki start (GitHub Codespaces)

1. Otwórz to repo w GitHub Codespaces:
   - Kliknij zielony przycisk **"Code"**
   - Wybierz **"Codespaces"** 
   - Kliknij **"Create codespace on main"**

2. Poczekaj na automatyczną instalację (2-3 minuty)

3. W terminalu uruchom:
```bash
npm run dev
```

4. Otwórz aplikację w przeglądarce (VS Code pokaże link)

**Gotowe!** 🎉

## 💻 Instalacja lokalna

```bash
# Sklonuj repo
git clone https://github.com/TWOJE-KONTO/TWOJE-REPO.git
cd TWOJE-REPO

# Zainstaluj zależności
npm install

# Uruchom
npm run dev
```

Otwórz http://localhost:5173

## 📦 Build produkcyjny

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **html2canvas** - Eksport do JPEG
- **jsPDF** - Generowanie PDF
- **Vanilla CSS** - Styling

## 📁 Struktura projektu

```
/
├── index.html          - Entry point
├── main.jsx            - React bootstrap
├── App.jsx             - Główny komponent
├── components/
│   ├── MatrixView.jsx  - Matryca
│   ├── CommentDialog.jsx - Dialog komentarzy
│   └── Toast.jsx       - Powiadomienia
└── styles/
    └── simple.css      - Style
```

## 🎨 Jak używać

1. **Dodaj komentarz**: Kliknij na komórkę w matrycy
2. **Wprowadź dane**: Wpisz tytuł i treść
3. **Zapisz**: Kliknij "Zapisz"
4. **Usuń**: Kliknij "Usuń" w dialogu
5. **Eksportuj**: Użyj przycisków w toolbarze

## 📤 Export/Import

- **Export JPEG**: Zapisuje matrycę jako obraz
- **Generuj PDF**: Tworzy raport PDF
- **Export JSON**: Zapisuje komentarze do pliku
- **Import JSON**: Wczytuje komentarze z pliku

## 🐛 Problemy?

### Port jest zajęty
```bash
# Zmień port w vite.config.js na inny (np. 3000)
```

### Nie działa export
```bash
# Sprawdź czy masz zainstalowane wszystkie zależności
npm install
```

## 📝 Licencja

MIT License - używaj jak chcesz!

## 🤝 Wkład

Pull requesty mile widziane!

1. Fork repo
2. Utwórz branch (`git checkout -b feature/nowa-funkcja`)
3. Commit (`git commit -m 'Dodano nową funkcję'`)
4. Push (`git push origin feature/nowa-funkcja`)
5. Otwórz Pull Request

---

**Made with ❤️ for cyber security analysis**
