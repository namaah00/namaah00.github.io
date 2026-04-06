export const translations = {
  pl: {
    
     //NAGŁÓWEK I NAWIGACJA
    appTitle: 'System Analizy Informacji',
    appSubtitle: '„Punkt widzenia może być niebezpiecznym luksusem, gdy zastępuje wgląd i zrozumienie" - Marshall McLuhan',
    help: 'Pomoc',
    comments: 'Komentarzy',
    changeLanguage: 'Zmień język',
    toggleTheme: 'Przełącz motyw',
    
    //TRONA STARTOWA
    welcomeTitle: 'Witaj w Systemie Analizy Informacji',
    welcomeSubtitle: 'Wybierz jedną z opcji, aby rozpocząć pracę',
    newProject: 'Nowa analiza',
    newProjectDescription: 'Rozpocznij nową analizę',
    importProject: 'Importuj projekt',
    importProjectDescription: 'Wczytaj wcześniej zapisany projekt z pliku JSON',
    footerText: 'Model Weryfikacji Informacji VeriQ',
    invalidFileType: 'Nieprawidłowy typ pliku. Wybierz plik JSON.',
    invalidJSON: 'Błąd odczytu pliku JSON. Upewnij się, że plik jest prawidłowy.',
    
  ///PASEK NARZĘDZI
    generatePDF: 'Generuj PDF',
    radarChart: 'Wykres radarowy',
    exportJSON: 'Eksport JSON',
    importJSON: 'Import JSON',
    clearAll: 'Wyczyść wszystko',
    backToHome: 'Powrót do strony głównej',
    confirmBackToHome: 'Czy na pewno chcesz wrócić do strony głównej? Niezapisane zmiany mogą zostać utracone.',
    
  //PRZYCISKI I AKCJE
    save: 'Zapisz',
    delete: 'Usuń',
    cancel: 'Anuluj',
    
  //DIALOG KOMENTARZE
    commentTitle: 'Komentarz',
    titleLabel: 'Tytuł',
    titlePlaceholder: 'Krótki tytuł komentarza',
    contentLabel: 'Treść',
    contentPlaceholder: 'Szczegółowy opis, analiza, wnioski...',
    imagesLabel: 'Obrazy',
    imagesHint: 'Max 2MB na obraz',
    chooseFiles: 'Wybierz pliki',
    noFileChosen: 'Nie wybrano pliku',
    filesSelected: 'plików wybranych',
    uploadedImages: 'Dodane obrazy',
    imageTooLarge: 'Obraz jest za duży (max 2MB)',
    ratingLabel: 'Ocena',
    ratingPlaceholder: 'Wybierz ocenę (0-5)',
    noRating: 'Brak oceny',
    
  //PDF DIALOG
    pdfDialogTitle: 'Personalizacja raportu PDF',
    pdfReportTitleLabel: 'Tytuł raportu',
    pdfReportTitlePlaceholder: 'Analiza potencjalnej dezinformacji XYZ',
    pdfAuthorLabel: 'Autor raportu',
    pdfAuthorPlaceholder: 'Jan Kowalski',
    pdfGenerateButton: 'Generuj PDF',
    pdfCancelButton: 'Anuluj',
    pdfValidationError: 'Proszę wypełnić wszystkie pola',
    pdfPrimaryElement: 'Element nadrzędny',
    pdfSecondaryElement: 'Element podrzędny',
    pdfTitle: 'Raport Analizy Informacji',
    pdfGenerated: 'Raport PDF wygenerowany pomyślnie',
    pdfGenerateError: 'Błąd podczas generowania PDF',
    pdfComments: 'Komentarze',
    pdfNoComments: 'Brak komentarzy w tej warstwie',
    
  // DIALOGRADAR
    radarTitle: 'Wykres radarowy ocen',
    radarSelectPE: 'Wybierz element:',
    radarPE001: 'Element nadrzędny 001 - Ocena treści',
    radarPE002: 'Element nadrzędny 002 - Ocena źródła',
    radarExportPNG: 'Eksportuj jako PNG',
    radarClose: 'Zamknij',
    radarNoData: 'Brak danych',
    radarNoDataDesc: 'Uzupełnij wszystkie oceny (0–5), aby zobaczyć wykres',
    radarMissingRatings: 'Brakujące oceny dla',
    radarExportSuccess: 'Wykres wyeksportowany do pliku PNG',
    radarExportError: 'Błąd podczas eksportu',
    
  // ŹRÓDŁA DIALOG 
    sourcesAddBtn: 'Dodaj źródło',
    sourcesNoSources: 'Brak źródeł. Kliknij "Dodaj źródło"',
    sourcesDeleteSource: 'Usuń źródło',
    sourcesConfirmDelete: 'Czy na pewno chcesz usunąć to źródło?',
    sourcesWillBeDeleted: 'Zostanie usunięte wraz ze wszystkimi komentarzami.',
    sourceDialogTitle: 'Dodaj źródło',
    sourceDialogNameLabel: 'Nazwa źródła',
    sourceDialogNamePlaceholder: 'Podaj nazwę źródła lub link do artykułu/wypowiedzi',
    sourceDialogCancel: 'Anuluj',
    sourceDialogAdd: 'Dodaj',
    
  //WARSTWY (L1, L2, L3)
    layer1: 'Warstwa I - Jakość Informacji',
    layer2: 'Warstwa II - Kontekst',
    layer3: 'Warstwa III - Kontrast',
    
  // ELEMENTY NADRZĘDNE (PE001-PE004)
    pe001: 'Ocena treści',
    pe002: 'Ocena źródła',
    pe003: 'Ocena kontekstu',
    pe004: 'Ocena kontrastu',
    
  //ELEMENTY PODRZĘDNE (SE)
    
    // PE001Ocena treści
    se001_1: 'Spójność logiczna',
    se001_2: 'Forma przekazu',
    se001_3: 'Transparentność',
    se001_4: 'Rzetelność',
    se001_5: 'Obiektywność',
    se001_6: 'Autentyczność cyfrowa',
    
    // PE002 Ocena źródła
    se002_1: 'Autorytet',
    se002_2: 'Reputacja',
    se002_3: 'Afiliacja',
    se002_4: 'Historia Wiarygodności',
    
    // PE003 Ocena kontekstu
    se003_1: 'Aktualność',
    se003_2: 'Cel przekazu',
    se003_3: 'Odbiorca',
    se003_4: 'Sytuacja społeczna',
    se003_5: 'Interesy',
    se003_6: 'Okoliczności powstania',
    se003_7: 'Dynamika',
    se003_8: 'Kontekst geopolityczny',
    se003_9: 'Zasięg',
    se003_10: 'Spójność techniczna',
    
    // PE004 Ocena kontrastu
    se004_1: 'Zgodności',
    se004_2: 'Rozbieżności',
    se004_3: 'Różnorodność',
    se004_4: 'Kontekst międzynarodowy',
    
  //OPISY ELEMENTY PODRZĘDNE (SE)
    
    // PE001 Ocena treści
    seDesc_001_1: 'Ocenia zgodność logiczną przekazu i poprawność wnioskowania',
    seDesc_001_2: 'Ocenia język, styl, ton oraz ich dopasowanie do tematu',
    seDesc_001_3: 'Ocenia jawność źródeł, metodologii i możliwości weryfikacji',
    seDesc_001_4: 'Ocenia poprawność faktów, danych i terminologii',
    seDesc_001_5: 'Ocenia, czy przekaz jest bezstronny i wolny od manipulacji',
    seDesc_001_6: 'Ocenia wiarygodność materiałów cyfrowych',
    
    // PE002 Ocena źródła
    seDesc_002_1: 'Ocenia poziom kompetencji i uznania źródła w danej dziedzinie',
    seDesc_002_2: 'Ocenia postrzeganie źródła w innych wiarygodnych kanałach',
    seDesc_002_3: 'Ocenia powiązania organizacyjne, finansowe i polityczne źródła',
    seDesc_002_4: 'Ocenia wcześniejszą rzetelność źródła',
    
    // PE003 Ocena kontekstu
    seDesc_003_1: 'Ocenia aktualność informacji',
    seDesc_003_2: 'Ocenia intencje autora - informowanie, przekonywanie, czy manipulacja',
    seDesc_003_3: 'Ocenia grupę docelową i dostosowanie treści do odbiorcy',
    seDesc_003_4: 'Ocenia dopasowanie przekazu do nastrojów społecznych',
    seDesc_003_5: 'Ocenia potencjalne korzyści autora',
    seDesc_003_6: 'Ocenia warunki i okoliczności powstania informacji',
    seDesc_003_7: 'Ocenia zmienność sytuacji i tempo wydarzeń',
    seDesc_003_8: 'Ocenia wpływ interesów międzynarodowych',
    seDesc_003_9: 'Ocenia skalę rozpowszechnienia informacji i sposób dystrybucji treści',
    seDesc_003_10: 'Ocenia zgodność materiałów multimedialnych z opisem',
    
    // PE004 Ocena kontrastu
    seDesc_004_1: 'Ocenia wspólne elementy między różnymi źródłami',
    seDesc_004_2: 'Ocenia sprzeczności między źródłami',
    seDesc_004_3: 'Ocenia pluralizm źródeł i perspektyw',
    seDesc_004_4: 'Ocenia selekcję zagranicznych danych',
    
  //WSKAZÓWKI ELEMENTY PODRZĘDNE (SE) 
    
    // PE001 Ocena treści
    seHints_001_1: ['Wnioski nie wynikają z przedstawionych faktów', 'Fałszywe związki przyczynowo-skutkowe', 'Wybiera tylko wygodne fakty („cherry-picking")', 'Są wewnętrzne sprzeczności', 'Brakuje kroków rozumowania („skacze" od tezy do tezy)'],
    seHints_001_2: ['Format nie pasuje do treści (np. clickbait)', 'Nadmierne użycie emocjonalnych słów', 'Wyolbrzymienia lub dramatyzowanie', 'Niska jakość grafiki lub wideo', 'Chaotyczna struktura tekstu'],
    seHints_001_3: ['Brak informacji o autorze', 'Nie podano źródeł danych', 'Ukryte sponsorowanie lub konflikt interesów', 'Metodologia badań jest niejasna', 'Brak dat publikacji lub aktualizacji'],
    seHints_001_4: ['Błędne lub niespójne dane liczbowe', 'Nieprecyzyjna terminologia', 'Cytowanie badań bez kontekstu', 'Brak rozróżnienia między danymi a szacunkami', 'Uproszczenia prowadzące do zniekształceń'],
    seHints_001_5: ['Jednostronny opis sytuacji', 'Pomija istotne fakty lub konteksty', 'Używa stronniczego języka', 'Przedstawia opinie jako fakty', 'Brak alternatywnych punktów widzenia'],
    seHints_001_6: ['Podejrzane metadane plików', 'Ślady edycji w dokumentach cyfrowych', 'Niezgodność dat utworzenia/modyfikacji', 'Brak cyfrowych sygnatur lub certyfikatów', 'Manipulacja obrazów (deepfake, photoshop)'],
    
    // PE002 Ocena źródła
    seHints_002_1: ['Brak wykształcenia lub doświadczenia w temacie', 'Nie jest rozpoznawalny w branży', 'Samozwańczy „ekspert" bez kwalifikacji', 'Pseudonaukowe stopnie lub tytuły', 'Znany z kontrowersyjnych poglądów'],
    seHints_002_2: ['Źródło ma złą reputację medialną', 'Brak cytowań w wiarygodnych źródłach', 'Historia rozpowszechniania dezinformacji', 'Powielanie niesprawdzonych treści', 'Brak korekt po ujawnieniu błędów'],
    seHints_002_3: ['Ukryte powiązania z grupami interesu', 'Finansowanie z nieprzejrzystych źródeł', 'Związki z partiami politycznymi lub lobbystami', 'Zależność od sponsorów', 'Konflikt interesów'],
    seHints_002_4: ['Powtarzające się błędy w przeszłych publikacjach', 'Ignorowanie sprostowań lub krytyki', 'Brak reakcji na wykryte nieścisłości', 'Historia manipulacji informacją', 'Usuwanie lub zmienianie treści bez wyjaśnienia'],
    
    // PE003 Ocena kontekstu
    seHints_003_1: ['Stare informacje przedstawiane jako nowe', 'Pominięto najnowsze wydarzenia', 'Brak dat w kluczowych miejscach', 'Przestarzałe statystyki', 'Nie uwzględnia aktualnego kontekstu'],
    seHints_003_2: ['Ukryty cel perswazyjny', 'Wyraźna agenda polityczna lub ideologiczna', 'Próba wywołania określonych emocji', 'Marketingowa lub reklamowa natura', 'Propaganda lub dezinformacja'],
    seHints_003_3: ['Manipulacyjne dostosowanie do grupy docelowej', 'Różne wersje tej samej informacji dla różnych odbiorców', 'Wykorzystanie stereotypów lub uprzedzeń', 'Język dostosowany do wywołania emocji', 'Pomija informacje niewygodne dla odbiorcy'],
    seHints_003_4: ['Ignoruje kontekst społeczny', 'Nie uwzględnia nastrojów społecznych', 'Pomija istotnekwestie kulturowe', 'Brak związku z aktualną sytuacją społeczną', 'Niezrozumienie lokalnego kontekstu'],
    seHints_003_5: ['Ukryte korzyści finansowe', 'Promuje określone produkty lub usługi', 'Zyski polityczne lub wizerunkowe', 'Wpływ na decyzje gospodarcze', 'Osobiste korzyści autora'],
    seHints_003_6: ['Ograniczony dostęp do źródeł', 'Presja polityczna lub cenzura', 'Tworzenie treści w warunkach kryzysowych', 'Selektywne przedstawianie faktów', 'Brak kontekstu sytuacyjnego'],
    seHints_003_7: ['Pomija szybko zmieniającą się sytuację', 'Statyczny obraz dynamicznych wydarzeń', 'Brak aktualizacji pomimo nowych faktów', 'Nie uwzględnia tempa zmian', 'Przestarzała analiza'],
    seHints_003_8: ['Ignoruje międzynarodowy kontekst', 'Jednostronna perspektywa geopolityczna', 'Pomija istotne relacje między państwami', 'Brak globalnego spojrzenia', 'Nacjonalistyczne uprzedzenia'],
    seHints_003_9: ['Lokalny incydent przedstawiony jako globalny', 'Przesadzona skala wpływu', 'Ignorowanie rzeczywistego zasięgu', 'Sztuczne pompowanie znaczenia', 'Brak danych o rzeczywistym oddziaływaniu'],
    seHints_003_10: ['Materiały multimedialne nie pasują do opisu', 'Niezgodność czasu lub miejsca', 'Użycie archiwalnych zdjęć jako aktualnych', 'Materiały z innych wydarzeń', 'Manipulacja kontekstem wizualnym'],
    
    // PE004 Ocena kontrastu
    seHints_004_1: ['Tylko jedno źródło podaje informację', 'Brak potwierdzenia w innych źródłach', 'Zgodność tylko w nieistotnych szczegółach', 'Wzajemne cytowanie tych samych źródeł', 'Echo chamber'],
    seHints_004_2: ['Sprzeczne fakty w różnych źródłach', 'Różne daty lub liczby', 'Odmienne interpretacje tych samych wydarzeń', 'Wykluczające się wersje', 'Niemożliwe do pogodzenia relacje'],
    seHints_004_3: ['Źródła pochodzą z jednego środowiska', 'Brak perspektyw alternatywnych', 'Powielanie tych samych narracji', 'Efekt echo-chamber', 'Brak różnorodności geograficznej'],
    seHints_004_4: ['Wybiórcze cytowanie zagranicznych źródeł', 'Ignorowanie niewygodnych danych międzynarodowych', 'Używanie przykładów zagranicznych do manipulacji', 'Wzmacnianie lokalnej narracji kosztem pełnego obrazu', 'Brak kontekstu kulturowego lub politycznego'],
    
  //POWIADOMIENIA 
    commentSaved: 'Komentarz zapisany!',
    commentDeleted: 'Komentarz usunięty',
    ratingSaved: 'Ocena zapisana!',
    ratingDeleted: 'Ocena usunięta',
    exportSuccess: 'Wyeksportowano pomyślnie!',
    importSuccess: 'Zaimportowano pomyślnie!',
    clearSuccess: 'Wszystkie komentarze usunięte',
    exportError: 'Błąd podczas eksportu',
    importError: 'Błąd podczas importu',
    confirmClear: 'Czy na pewno chcesz usunąć wszystkie komentarze?',
    
  // STRUKTURA SAMOUCZEK
    helpTitle: 'Samouczek',
    helpClose: 'Zamknij',
    
    // Sekcje samouczka
    helpIntroTitle: 'Wprowadzenie',
    helpL1Title: 'Warstwa I - Jakość Informacji',
    helpL2Title: 'Warstwa II - Kontekst',
    helpL3Title: 'Warstwa III - Kontrast',
    helpUsageTitle: 'Funkcje aplikacji',
    helpTipsTitle: 'Wskazówki',
    
    // Nagłówki paneli opisu
    whatWeEvaluate: 'Co oceniamy:',
    warningSignals: 'Sygnały, na które warto zwrócić uwagę:',
    warningSignalsShort: 'Sygnały ostrzegawcze:',
    
  //SAMOUCZEK - WPROWADZENIE
    helpIntroHeading: 'Model Weryfikacji Informacji',
    helpIntroDesc: 'Aplikacja wspomaga analizę informacji w trzech warstwach hierarchicznych:',
    helpIntroL1: 'Ocena treści i źródła informacji',
    helpIntroL2: 'Analiza kontekstu otaczającego badany materiał',
    helpIntroL3: 'Porównanie różnych źródeł informacji',
    helpHowToUse: 'Jak używać aplikacji:',
    helpStep1: 'Przygotuj analizowany materiał',
    helpStep2: 'Przeanalizuj go z pomocą elementów podrzędnych trzech warstw modelu',
    helpStep3: 'Dodaj komentarze i oceny aby uzasadnić Twoje wnioskowanie oraz udokumentować przebieg analizy',
    helpStep4: 'Dodaj źródła i porównaj sprzeczności lub spójności',
    helpStep5: 'Generuj raport analityczny lub eksportuj plik JSON aby zapisać Twoją analizę',
    helpNote: 'Aplikacja będzie kontynuowała działanie po utracie połączenia z Internetem, jednak pamiętaj o zapisie pliku JSON regularnie jako backup',
    
  //SAMOUCZEK WARSTWA I (L1)
    helpL1Desc: 'Warstwa podstawowa oceniająca fundamentalne aspekty informacji.',
    helpL1PE001: '001 - Ocena treści',
    helpL1PE001Desc: 'Analiza samej treści przekazu pod kątem jakości i rzetelności.',
    helpL1PE002: '002 - Ocena źródła',
    helpL1PE002Desc: 'Analiza wiarygodności i reputacji źródła informacji.',
    
    //Praktyczne wskazówki dla SE w Warstwie 1
    helpSE001_1: ['Sprawdź, czy wnioski wynikają logicznie z przedstawionych faktów', 'Zidentyfikuj pominięte założenia lub błędy w rozumowaniu', 'Oceń, czy argumenty wzajemnie się wspierają czy wykluczają', 'Wykryj próby manipulacji logiką (np. fałszywe dychotomie, "slippery slope")', 'Sprawdź, czy tekst zawiera wewnętrzne sprzeczności'],
    helpSE001_2: ['Oceń, czy format przekazu jest adekwatny do treści (artykuł, wideo, infografika)', 'Zwróć uwagę na nadużywanie clickbaitu, sensacji lub prowokacji', 'Sprawdź jakość techniczną materiału (gramatyka, montaż wideo, grafika)', 'Oceń, czy styl języka jest obiektywny czy emocjonalny i stronniczy', 'Zwróć uwagę na nadmierne użycie wielkich liter, wykrzykników lub dramatycznych sformułowań'],
    helpSE001_3: ['Sprawdź, czy autor jest wyraźnie wskazany i możliwy do zidentyfikowania', 'Oceń, czy podane są źródła informacji i danych', 'Zweryfikuj, czy ujawniono potencjalne konflikty interesów lub sponsoring', 'Sprawdź, czy wyjaśniono metodologię badań lub sposób pozyskania informacji', 'Oceń dostępność dat publikacji oraz informacji o aktualizacjach treści'],
    helpSE001_4: ['Zweryfikuj fakty poprzez wyszukiwanie ich w wiarygodnych źródłach zewnętrznych', 'Sprawdź, czy dane liczbowe są spójne i możliwe do potwierdzenia', 'Oceń precyzję terminologii specjalistycznej (medycznej, naukowej, prawnej)', 'Zweryfikuj, czy cytowane badania lub dokumenty rzeczywiście istnieją i są poprawnie zrozumiane', 'Oceń, czy rozróżniono dane od szacunków, opinii i przewidywań'],
    helpSE001_5: ['Sprawdź, czy prezentowana jest tylko jedna strona lub perspektywa', 'Oceń, czy pominięto istotne fakty lub konteksty, które zmieniłyby obraz sytuacji', 'Zwróć uwagę na stronniczy język, etykiety, epitety lub tendencyjne określenia', 'Sprawdź, czy opinie lub oceny są wyraźnie oddzielone od faktów', 'Oceń, czy przedstawiono alternatywne punkty widzenia lub opinie ekspertów o innych poglądach'],
    helpSE001_6: ['Sprawdź metadane plików graficznych i wideo (data utworzenia, edycji, pochodzenie)', 'Użyj narzędzi do analizy obrazów pod kątem manipulacji (np. FotoForensics, InVID)', 'Oceń autentyczność twarzy i głosów w nagraniach wideo (deepfake)', 'Sprawdź, czy dokumenty posiadają cyfrowe podpisy lub certyfikaty autentyczności', 'Zweryfikuj spójność cieni, perspektywy i oświetlenia na zdjęciach'],
    
    helpSE002_1: ['Sprawdź kwalifikacje autora lub źródła w danej dziedzinie (wykształcenie, doświadczenie)', 'Oceń, czy autor jest rozpoznawalny i cytowany w środowisku eksperckim', 'Zweryfikuj, czy stopnie i tytuły naukowe są autentyczne i z akredytowanych instytucji', 'Oceń, czy autor publikował w renomowanych czasopismach lub mediach', 'Sprawdź, czy źródło nie jest samozwańczym "ekspertem" bez realnych kwalifikacji'],
    helpSE002_2: ['Sprawdź historię publikacji źródła w niezależnych archiwach fact-checkingowych', 'Oceń, czy źródło ma negatywne oceny od organizacji weryfikujących fakty', 'Sprawdź, czy źródło publikowało wcześniej fake newsy lub dezinformację', 'Zweryfikuj, czy źródło wydawało korekty lub przeprosiny za błędy', 'Oceń, czy źródło jest powszechnie cytowane przez wiarygodne media'],
    helpSE002_3: ['Sprawdź źródła finansowania organizacji lub autora', 'Oceń powiązania z partiami politycznymi, lobbystami lub grupami interesu', 'Zidentyfikuj potencjalne konflikty interesów (np. autor pisze o firmie, która go sponsoruje)', 'Sprawdź, czy źródło jest zależne od sponsorów o jasno określonej agendzie', 'Oceń przejrzystość struktury własnościowej i finansowej organizacji'],
    helpSE002_4: ['Przeanalizuj wcześniejsze publikacje źródła pod kątem dokładności i rzetelności', 'Sprawdź, czy źródło ignorowało sprostowania lub krytykę swoich materiałów', 'Oceń, jak źródło reagowało na wykrycie błędów (korekty, przeprosiny, ignorowanie)', 'Zweryfikuj, czy źródło usuwało lub zmieniało treści bez wyjaśnienia', 'Sprawdź, czy źródło ma historię manipulacji informacją lub naruszania standardów dziennikarskich'],
    
  // SAMOUCZEK - WARSTWA II (L2)
    helpL2Desc: 'Warstwa kontekstowa analizująca szerszy obraz sytuacji.',
    helpL2PE003: '003 - Ocena kontekstu',
    helpL2PE003Desc: 'Analiza okoliczności powstania i obiegu informacji.',
    
    // Praktyczne wskazówki dla SE w Warstwie 2
    helpSE003_1: ['Sprawdź datę publikacji i oceń, czy informacja jest aktualna', 'Zweryfikuj, czy uwzględniono najnowsze wydarzenia i aktualizacje', 'Oceń, czy nie użyto archiwalnych danych jako aktualnych', 'Sprawdź, czy statystyki i dane liczbowe pochodzą z odpowiedniego okresu', 'Zwróć uwagę na stare treści prezentowane jako świeże wydarzenia (recykling informacji)'],
    helpSE003_2: ['Oceń, czy celem jest informowanie czy przekonywanie do określonego stanowiska', 'Zidentyfikuj ukryte cele perswazyjne lub propagandowe', 'Sprawdź, czy materiał ma charakter reklamowy lub marketingowy', 'Oceń, czy autor próbuje wywołać określone emocje (strach, wściekłość, pogardę)', 'Zwróć uwagę na wyraźną agendę polityczną, ideologiczną lub komercyjną'],
    helpSE003_3: ['Zidentyfikuj docelową grupę odbiorców przekazu', 'Oceń, czy treść jest manipulacyjnie dostosowana do przekonań lub emocji odbiorcy', 'Sprawdź, czy istnieją różne wersje tej samej informacji dla różnych grup', 'Zwróć uwagę na użycie stereotypów, uprzedzeń lub "dog whistles"', 'Oceń, czy pomija się informacje niewygodne dla danej grupy odbiorców'],
    helpSE003_4: ['Oceń kontekst społeczny i polityczny w momencie publikacji', 'Sprawdź, czy materiał odnosi się do aktualnych nastrojów społecznych lub napięć', 'Zwróć uwagę na kwestie kulturowe i lokalne, które mogą wpływać na interpretację', 'Oceń, czy autor rozumie kontekst społeczny czy go ignoruje', 'Sprawdź, czy materiał może być próbą wykorzystania lub podsycenia konfliktów społecznych'],
    helpSE003_5: ['Zidentyfikuj potencjalne korzyści finansowe autora lub źródła', 'Sprawdź, czy materiał promuje określone produkty, usługi lub inwestycje', 'Oceń możliwe zyski polityczne, wizerunkowe lub korporacyjne', 'Zwróć uwagę na ukryte reklamy lub partnerstwa biznesowe', 'Sprawdź, czy autor może mieć osobiste korzyści z przekazywanych informacji'],
    helpSE003_6: ['Oceń okoliczności powstania materiału (presja polityczna, cenzura, kryzys)', 'Sprawdź, czy autor miał pełny dostęp do źródeł informacji', 'Zwróć uwagę na nietypowy czas publikacji (np. tuż przed wyborami, w trakcie kryzysu)', 'Oceń, czy materiał powstał w warunkach ograniczonej wolności słowa lub pod przymusem', 'Sprawdź, czy brakuje naturalnego kontekstu sytuacyjnego dla publikacji'],
    helpSE003_7: ['Oceń, czy materiał uwzględnia dynamikę sytuacji i tempo wydarzeń', 'Sprawdź, czy informacja była aktualizowana w odpowiedzi na nowe fakty', 'Zwróć uwagę na prezentowanie statycznego obrazu szybko zmieniających się wydarzeń', 'Oceń, czy autor pomija lub bagatelizuje nowe informacje, które zmieniają kontekst', 'Sprawdź, czy analiza uwzględnia możliwą ewolucję sytuacji w przyszłości'],
    helpSE003_8: ['Oceń międzynarodowy kontekst i relacje geopolityczne', 'Sprawdź, czy pominięto istotne aspekty międzynarodowe lub dyplomatyczne', 'Zwróć uwagę na jednostronną perspektywę geopolityczną', 'Oceń, czy materiał uwzględnia interesy i działania kluczowych graczy międzynarodowych', 'Sprawdź obecność nacjonalistycznych lub etnicznych uprzedzeń w narracji'],
    helpSE003_9: ['Oceń rzeczywistą skalę rozpowszechnienia informacji (lokalnie vs globalnie)', 'Sprawdź, czy nie przesadzono z zasięgiem lub wpływem wydarzenia', 'Zwróć uwagę na sztuczne pompowanie znaczenia marginalnych incydentów', 'Oceń, czy dostępne są dane o rzeczywistym oddziaływaniu informacji', 'Sprawdź sposób dystrybucji treści (oficjalne media, social media, komunikatory)'],
    helpSE003_10: ['Zweryfikuj zgodność materiałów multimedialnych z opisem tekstowym', 'Sprawdź, czy zdjęcia lub wideo faktycznie pochodzą z opisywanego miejsca i czasu', 'Użyj wyszukiwania obrazów, aby sprawdzić, czy materiał nie jest archiwalny lub z innego kontekstu', 'Oceń spójność techniczną (np. metadane, jakość nagrania, geolokalizacja)', 'Zwróć uwagę na manipulację kontekstem wizualnym (np. kadry wycinające kluczowe elementy)'],
    
  //SAMOUCZEK - WARSTWA III (L3)
    helpL3Desc: 'Warstwa porównawcza analizująca różnice i zgodności między źródłami.',
    helpL3PE004: '004 - Ocena kontrastu',
    helpL3PE004Desc: 'Porównanie i weryfikacja informacji z różnych źródeł.',
    
    // Praktyczne wskazówki dla SE w Warstwie 3
    helpSE004_1: ['Zidentyfikuj fakty potwierdzane przez wiele niezależnych źródeł', 'Oceń, czy źródła rzeczywiście są niezależne czy wzajemnie się cytują', 'Sprawdź, czy zgodność dotyczy istotnych faktów czy tylko szczegółów', 'Zwróć uwagę na efekt "echo chamber" - powielanie tych samych informacji', 'Oceń jakość i wiarygodność źródeł potwierdzających informację'],
    helpSE004_2: ['Zidentyfikuj sprzeczności faktograficzne między różnymi źródłami', 'Oceń, czy rozbieżności dotyczą istotnych faktów czy interpretacji', 'Sprawdź, które źródło dostarcza bardziej szczegółowych lub weryfikowalnych informacji', 'Zwróć uwagę na różnice w datach, liczbach lub opisach kluczowych wydarzeń', 'Oceń, czy rozbieżności można wyjaśnić różnicą w czasie publikacji lub dostępem do informacji'],
    helpSE004_3: ['Oceń, czy korzystasz z różnych typów źródeł (media, eksperci, dokumenty oficjalne, świadkowie)', 'Sprawdź, czy źródła reprezentują różne perspektywy i orientacje (polityczne, geograficzne)', 'Zwróć uwagę na dominację jednego typu źródeł (np. tylko media, bez ekspertów)', 'Oceń, czy masz dostęp do źródeł pierwotnych (dokumenty, nagrania) czy tylko wtórnych (artykuły)', 'Sprawdź różnorodność geograficzną i kulturową źródeł'],
    helpSE004_4: ['Sprawdź, czy uwzględniono perspektywy międzynarodowe i zagraniczne źródła', 'Oceń, czy nie polegasz wyłącznie na źródłach krajowych lub z jednego regionu', 'Zwróć uwagę na selektywne cytowanie zagranicznych źródeł tylko wtedy, gdy wspierają lokalną narrację', 'Sprawdź, czy zagraniczne źródła są przedstawiane w odpowiednim kontekście kulturowym i politycznym', 'Oceń, czy międzynarodowe źródła są autentyczne czy to dezinformacja podszywająca się pod zagraniczne media'],
    
  //SAMOUCZEK FUNKCJONALNOŚCI
    
    // Dodawanie komentarzy
    helpUsageAddComments: 'Dodawanie komentarzy',
    helpUsageAddStep1: 'Znajdź Element podrzędny, który chcesz przeanalizować',
    helpUsageAddStep2: 'Kliknij w danym elemencie przyciskiem "+"',
    helpUsageAddStep3: 'W oknie dialogowym wprowadź:',
    helpUsageAddTitle: 'Krótkie podsumowanie (np. "Źródło niezweryfikowane")',
    helpUsageAddContent: 'Szczegółowa analiza i wnioski',
    helpUsageAddImage: 'Opcjonalnie: załącz obraz JPG/PNG (max 5MB)',
    helpUsageAddStep4: 'Kliknij "Zapisz"',
    helpUsageImageNote: 'Elementy z komentarzami mają pogrubioną ramkę dla przejrzystości',
    
    // Edycja i usuwanie
    helpUsageEdit: 'Edycja i usuwanie',
    helpUsageEditStep1: 'Kliknij na ikonę komentarza aby edytować komentarz',
    helpUsageEditStep2: 'W oknie dialogowym możesz zmienić tytuł i treść',
    helpUsageEditStep3: 'Użyj przycisku "Usuń" aby usunąć komentarz',
    
    // System ocen
    helpUsageRating: 'System ocen',
    helpUsageRatingStep1: 'Kliknij ikonę gwiazdki przy dowolnym Elemencie podrzędnym w warstwie pierwszej',
    helpUsageRatingStep2: 'Każdy Element podrzędny ma indywidualną skalę ocen',
    helpUsageRatingStep3: 'Element podrzędny z oceną ma pogrubioną ramkę dla przejrzystości',
    helpUsageRatingNote: 'System ocen pozwala szybko oznaczyć problematyczne obszary bez tworzenia pełnego komentarza',
    
    // Wykres radarowy
    helpUsageRadar: 'Wykres radarowy',
    helpUsageRadarStep1: 'Kliknij przycisk "Wykres radarowy" w górnym menu',
    helpUsageRadarStep2: 'Wybierz Element nadrzędny, dla którego chcesz zobaczyć wykres',
    helpUsageRadarStep3: 'Wykres wygeneruje się tylko gdy wszystkie Elementy podrzędne w danym Elemencie nadrzędnym mają oceny',
    helpUsageRadarStep4: 'Możesz eksportować wykres jako PNG',
    helpUsageRadarNote: 'Wykres radarowy pomaga wizualnie zidentyfikować najbardziej problematyczne obszary analizy',
    
    // Eksport do PDF
    helpUsagePDF: 'Eksport do PDF',
    helpUsagePDFStep1: 'Kliknij przycisk "Generuj PDF"',
    helpUsagePDFStep2: 'Po wprowadzeniu tytułu i autora raportu, aplikacja wygeneruje raport z wszystkimi komentarzami',
    helpUsagePDFStep3: 'PDF zawiera:',
    helpUsagePDFItem1: 'Listę wszystkich komentarzy pogrupowanych według warstw lub źródeł',
    helpUsagePDFItem2: 'Załączone obrazy (jeśli dodane do komentarzy)',
    helpUsagePDFItem3: 'Podpisy pod obrazami (nazwa pliku JPG/PNG)',
    helpUsagePDFItem4: 'Datę i godzinę generowania raportu',
    
    // Eksport/Import JSON
    helpUsageJSON: 'Eksport/Import JSON',
    helpUsageJSONExport: 'Eksport:',
    helpUsageJSONExportStep1: 'Kliknij "Eksportuj JSON"',
    helpUsageJSONExportStep2: 'Zapisz plik na dysku',
    helpUsageJSONImport: 'Import:',
    helpUsageJSONImportStep1: 'Kliknij "Importuj JSON"',
    helpUsageJSONImportStep2: 'Wybierz wcześniej zapisany plik',
    helpUsageJSONImportStep3: 'Wszystkie komentarze zostaną wczytane',
    
    // Czyszczenie danych
    helpUsageClear: 'Czyszczenie danych',
    helpUsageClearDesc: 'Kliknij "Wyczyść wszystko" aby usunąć wszystkie komentarze',
    helpUsageClearConfirm: 'Pojawi się potwierdzenie przed usunięciem',
    
  //SAMOUCZEK - WSKAZÓWKI
    
    // Efektywna analiza
    helpTipsAnalysis: 'Efektywna analiza',
    helpTipsAnalysisL1: 'Najpierw oceń jakość samej informacji',
    helpTipsAnalysisL2: 'Zrozum szerszy kontekst sytuacji',
    helpTipsAnalysisL3: 'Porównaj z innymi źródłami',
    
    // Tworzenie komentarzy
    helpTipsComments: 'Tworzenie komentarzy',
    helpTipsCommentsTitle: 'Powinien być krótki i opisowy (2-5 słów)',
    helpTipsCommentsContent: 'Zawieraj konkretne fakty, obserwacje i wnioski',
    helpTipsCommentsCite: 'Jeśli możliwe, odnoś się do konkretnych źródeł',
    helpTipsCommentsDate: 'Uwzględnij daty wydarzeń i publikacji',
    
    // Organizacja pracy
    helpTipsOrganization: 'Organizacja pracy',
    helpTipsOrgBackup: 'Regularnie eksportuj JSON jako backup',
    helpTipsOrgNaming: 'Używaj spójnej konwencji nazewnictwa w tytułach',
    helpTipsOrgPDF: 'Generuj PDF po zakończeniu analizy jako raport końcowy',
    helpTipsOrgFiles: 'Dla złożonych analiz twórz osobne pliki JSON dla różnych tematów',
    
    // Najlepsze praktyki
    helpTipsBestPractices: 'Najlepsze praktyki',
    helpTipsBPObjectivity: 'Oddzielaj fakty od opinii',
    helpTipsBPVerification: 'Sprawdzaj informacje w wielu źródłach',
    helpTipsBPDocumentation: 'Zapisuj źródła i linki w treści komentarzy',
    helpTipsBPRegularity: 'Aktualizuj analizę w miarę napływu nowych informacji',
    
  //DODATKOWE
    note: 'Uwaga',
    objectivity: 'Obiektywność',
    verification: 'Weryfikacja',
    documentation: 'Dokumentacja',
    regularity: 'Regularność',
    
  }, 
 
  en: {
    
    ///NAGŁÓWEK/
    appTitle: 'Information Analysis System',
    appSubtitle: '"Point of view can be a dangerous luxury when substituted for insight and understanding" — Marshall McLuhan',
    help: 'Help',
    comments: 'Comments',
    changeLanguage: 'Change Language',
    toggleTheme: 'Toggle Theme',
    
    //LANDING PAGE
    welcomeTitle: 'Welcome to Information Analysis System',
    welcomeSubtitle: 'Choose one of the options to start working with the system',
    newProject: 'New Project',
    newProjectDescription: 'Start a new analysis from an empty model',
    importProject: 'Import Project',
    importProjectDescription: 'Load a previously saved project from a JSON file',
    footerText: 'Cybersecurity Tactics and Techniques Analysis System © 2026',
    invalidFileType: 'Invalid file type. Select a JSON file.',
    invalidJSON: 'JSON file read error. Make sure the file is valid.',
    
    //TOOLBAR
    generatePDF: 'Generate PDF',
    radarChart: 'Radar Chart',
    exportJSON: 'Export JSON',
    importJSON: 'Import JSON',
    clearAll: 'Clear All',
    backToHome: 'Back to Home',
    confirmBackToHome: 'Are you sure you want to go back to the home page? Unsaved changes will be retained in browser memory.',
    
    //PRZYCISKI
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
    
    //DIALOG KOMENTARZE
    commentTitle: 'Comment',
    titleLabel: 'Title',
    titlePlaceholder: 'Brief comment title',
    contentLabel: 'Content',
    contentPlaceholder: 'Detailed description, analysis, conclusions...',
    imagesLabel: 'Obrazy',
    imagesHint: 'Max 2MB per image',
    chooseFiles: 'Choose files',
    noFileChosen: 'No file chosen',
    filesSelected: 'files selected',
    uploadedImages: 'Uploaded images',
    imageTooLarge: 'Image is too large (max 2MB)',
    ratingLabel: 'Rating',
    ratingPlaceholder: 'Select rating (0-5)',
    noRating: 'No rating',
    
    //DIALOG PDF 
    pdfDialogTitle: 'PDF Report Configuration',
    pdfReportTitleLabel: 'Report Title',
    pdfReportTitlePlaceholder: 'e.g. XYZ Disinformation Campaign Analysis',
    pdfAuthorLabel: 'Report Author',
    pdfAuthorPlaceholder: 'e.g. John Doe',
    pdfGenerateButton: 'Generate PDF',
    pdfCancelButton: 'Cancel',
    pdfValidationError: 'Please fill in all fields',
    pdfPrimaryElement: 'Primary Element',
    pdfSecondaryElement: 'Secondary Element',
    pdfTitle: 'Information Analysis Report',
    pdfGenerated: 'PDF report generated successfully',
    pdfGenerateError: 'Error generating PDF',
    pdfComments: 'Comments',
    pdfNoComments: 'No comments in this layer',
    
    //DIALOGI RADAR
    radarTitle: 'Radar Chart of Ratings',
    radarSelectPE: 'Select element:',
    radarPE001: 'Primary Element 001 - Content Assessment',
    radarPE002: 'Primary Element 002 - Source Assessment',
    radarExportPNG: 'Export PNG',
    radarClose: 'Close',
    radarNoData: 'Incomplete data',
    radarNoDataDesc: 'To generate the chart, all Secondary Elements in the selected Primary Element must have ratings (0-5).',
    radarMissingRatings: 'Missing ratings in',
    radarExportSuccess: 'Chart exported to PNG',
    radarExportError: 'Export error',
    
    //DIALOG ŹRÓDŁA (004)
    sourcesAddBtn: 'Add Source',
    sourcesNoSources: 'No sources. Click "Add Source" to start.',
    sourcesDeleteSource: 'Delete Source',
    sourcesConfirmDelete: 'Are you sure you want to delete this source?',
    sourcesWillBeDeleted: 'Will be deleted along with all comments.',
    sourceDialogTitle: 'Add New Source',
    sourceDialogNameLabel: 'Source Name',
    sourceDialogNamePlaceholder: 'Enter source name (e.g. "Reuters", "TVN24", "BBC News")',
    sourceDialogCancel: 'Cancel',
    sourceDialogAdd: 'Add Source',
    
    //WARSTWY
    layer1: 'Layer I - Information Quality',
    layer2: 'Layer II - Broader Context',
    layer3: 'Layer III - Source Comparison',
    
    //ELEMENTY NADRZĘDNE (PE)
    pe001: 'Content Assessment',
    pe002: 'Source Assessment',
    pe003: 'Context Assessment',
    pe004: 'Contrast Assessment',
    
    //ELEMENTY PODRZĘDNE (SE) 
    se001_1: 'Logical Consistency',
    se001_2: 'Message Format',
    se001_3: 'Transparency',
    se001_4: 'Reliability',
    se001_5: 'Objectivity',
    se001_6: 'Digital Authenticity',
    se002_1: 'Authority',
    se002_2: 'Reputation',
    se002_3: 'Affiliation',
    se002_4: 'Credibility History',
    se003_1: 'Timeliness',
    se003_2: 'Message Purpose',
    se003_3: 'Audience',
    se003_4: 'Social Context',
    se003_5: 'Interests',
    se003_6: 'Origin Circumstances',
    se003_7: 'Dynamics',
    se003_8: 'Geopolitical Context',
    se003_9: 'Reach',
    se003_10: 'Technical Message Coherence',
    se004_1: 'Agreements',
    se004_2: 'Discrepancies',
    se004_3: 'Diversity',
    se004_4: 'International Context',
    
    //SE - OPISY 
    seDesc_001_1: 'Evaluates whether the message is logically structured and facts are consistent with each other',
    seDesc_001_2: 'Evaluates the method of information presentation and its adaptation to the topic',
    seDesc_001_3: 'Evaluates whether data sources and methods are clearly presented',
    seDesc_001_4: 'Evaluates the accuracy of facts and their verifiability',
    seDesc_001_5: 'Evaluates whether the message is unbiased and free from manipulation',
    seDesc_001_6: 'Evaluates the authenticity of documents and digital metadata',
    seDesc_002_1: 'Evaluates the level of competence and recognition of the source in the field',
    seDesc_002_2: 'Evaluates the publication history and social ratings of the source',
    seDesc_002_3: 'Evaluates organizational, financial, and political connections of the source',
    seDesc_002_4: 'Evaluates previous publications of the source and their accuracy',
    seDesc_003_1: 'Evaluates the timeliness of the information and its publication date',
    seDesc_003_2: 'Evaluates the author\'s intentions - to inform, persuade, manipulate, or entertain',
    seDesc_003_3: 'Evaluates the target audience and content adaptation to the recipient',
    seDesc_003_4: 'Evaluates the social, cultural, and economic context at the time of publication',
    seDesc_003_5: 'Evaluates financial, political, or personal interests related to the message',
    seDesc_003_6: 'Evaluates the conditions and circumstances of information creation',
    seDesc_003_7: 'Evaluates the variability of the situation and the pace of events',
    seDesc_003_8: 'Evaluates international aspects of the situation and relations between states',
    seDesc_003_9: 'Evaluates the scale of information dissemination and its impact',
    seDesc_003_10: 'Evaluates technical aspects of the message: format, quality, channels',
    seDesc_004_1: 'Evaluates common points between different sources',
    seDesc_004_2: 'Evaluates differences in relations and conflicting information',
    seDesc_004_3: 'Evaluates the diversity of information source types',
    seDesc_004_4: 'Evaluates the international dimension of sources and perspectives of different countries',
    
    //SE - WSKAZÓWKI 
    seHints_001_1: ['Conclusions do not follow from presented facts', 'Author confuses cause with effect', 'Selects only convenient facts ("cherry-picking")', 'Internal contradictions exist', 'Steps of reasoning are missing ("jumps" from thesis to thesis)'],
    seHints_001_2: ['Format does not match the content (e.g., clickbait)', 'Excessive use of emotional words', 'Too many capital letters or exclamation marks', 'Low quality graphics or video', 'Chaotic text structure'],
    seHints_001_3: ['No information about the author', 'Data sources are not provided', 'Hidden sponsorship or conflict of interest', 'Research methodology is unclear', 'No publication or update dates'],
    seHints_001_4: ['Factual errors that can be checked', 'Lack of specific data and numbers', 'Relies mainly on anecdotes', 'Quotes without sources', 'No way to verify statements'],
    seHints_001_5: ['One-sided description of the situation', 'Omits important facts or contexts', 'Uses biased language', 'Presents opinions as facts', 'Lacks alternative viewpoints'],
    seHints_001_6: ['Suspicious file metadata', 'Editing traces in digital documents', 'Creation/modification date mismatch', 'Lack of digital signatures or certificates', 'Image manipulation (deepfake, photoshop)'],
    seHints_002_1: ['Lack of education or experience in the topic', 'Not recognizable in the industry', 'Self-proclaimed "expert" without qualifications', 'Pseudoscientific degrees or titles', 'Known for controversial views'],
    seHints_002_2: ['History of publishing fake news', 'Multiple corrections and apologies', 'Negative ratings from fact-checkers', 'Known for sensational journalism', 'Blocked or flagged by platforms'],
    seHints_002_3: ['Hidden connections with interest groups', 'Funding from opaque sources', 'Connections with political parties or lobbyists', 'Dependency on sponsors', 'Conflict of interest'],
    seHints_002_4: ['Frequent publication of false information', 'Lack of correction of previous errors', 'History of removed content', 'Change in narrative line without explanation', 'Avoidance of responsibility for errors'],
    seHints_003_1: ['Old information presented as new', 'Latest events are omitted', 'No dates in key places', 'Outdated statistics', 'Does not consider the current context'],
    seHints_003_2: ['Hidden persuasive intent', 'Explicit political or ideological agenda', 'Attempt to evoke specific emotions', 'Marketing or advertising nature', 'Propaganda or disinformation'],
    seHints_003_3: ['Manipulative adaptation to the target audience', 'Different versions of the same information for different recipients', 'Use of stereotypes or preconceptions', 'Language adapted to evoke emotions', 'Omits information uncomfortable for the recipient'],
    seHints_003_4: ['Ignores social context', 'Does not consider social moods', 'Omits important cultural issues', 'Lack of connection with the current social situation', 'Lack of understanding of the local context'],
    seHints_003_5: ['Hidden financial benefits', 'Promotes specific products or services', 'Political or reputational gains', 'Impact on economic decisions', 'Personal benefits of the author'],
    seHints_003_6: ['Created under external pressure', 'Published at a suspicious time', 'Unusual circumstances of disclosure', 'Forced publication', 'Lack of natural context of creation'],
    seHints_003_7: ['Omits rapidly changing situations', 'Static image of dynamic events', 'No updates despite new facts', 'Does not consider the pace of change', 'Outdated analysis'],
    seHints_003_8: ['Ignores international context', 'One-sided geopolitical perspective', 'Omits important relations between states', 'Lack of global view', 'Nationalist preconceptions'],
    seHints_003_9: ['Local incident presented as global', 'Exaggerated scale of impact', 'Ignores the real reach', 'Artificially inflates significance', 'Lack of data on real impact'],
    seHints_003_10: ['Technical inconsistencies', 'Format not suitable for content', 'Quality issues with recording/image', 'Unusual distribution channels', 'Traces of technical manipulation'],
    seHints_004_1: ['Only one source provides information', 'No confirmation in other sources', 'Agreement only in minor details', 'Mutual citation of the same sources', 'Echo chamber'],
    seHints_004_2: ['Contradictory facts in different sources', 'Different dates or numbers', 'Different interpretations of the same events', 'Mutually exclusive versions', 'Impossible to reconcile relations'],
    seHints_004_3: ['Only one type of source (e.g., only media)', 'Lack of expert perspective', 'Lack of original documents', 'Sources from only one side', 'Homogeneous group of sources'],
    seHints_004_4: ['Only domestic sources', 'Lack of international perspective', 'Ignoring foreign sources', 'One-sided geopolitical narrative', 'Lack of global context'],
    
    //POWIADOMIENIA 
    commentSaved: 'Comment saved!',
    commentDeleted: 'Comment deleted',
    ratingSaved: 'Rating saved!',
    ratingDeleted: 'Rating deleted',
    exportSuccess: 'Exported successfully!',
    importSuccess: 'Imported successfully!',
    clearSuccess: 'All comments cleared',
    exportError: 'Export error',
    importError: 'Import error',
    confirmClear: 'Are you sure you want to delete all comments?',
    
    //SAMOUCZEK - STRUKTURA 
    helpTitle: 'Tutorial',
    helpClose: 'Close',
    helpIntroTitle: 'Introduction',
    helpL1Title: 'Layer I - Information Quality',
    helpL2Title: 'Layer II - Broader Context',
    helpL3Title: 'Layer III - Source Comparison',
    helpUsageTitle: 'Application Features',
    helpTipsTitle: 'Tips',
    whatWeEvaluate: 'What we evaluate:',
    warningSignals: 'Signals to watch out for:',
    warningSignalsShort: 'Warning signals:',
    helpIntroHeading: 'Cybersecurity Tactics and Techniques Analysis System',
    helpIntroDesc: 'The application allows systematic information analysis in three hierarchical layers:',
    helpIntroL1: 'Content and source assessment',
    helpIntroL2: 'Social and geopolitical context analysis',
    helpIntroL3: 'Comparison of different sources',
    helpHowToUse: 'How to use the application:',
    helpStep1: 'Click on any Secondary Element (SE) with "+" button',
    helpStep2: 'Add title and comment content',
    helpStep3: 'Save comment - it will be marked with a comment icon',
    helpStep4: 'Export analysis to PDF or JSON',
    helpStep5: 'Import previously saved analyses from JSON',
    helpNote: 'Only Secondary Elements (SE) are clickable and can contain comments. Primary Elements (PE) serve as category headers.',
    
    //SAMOUCZEK - WARSTWY
    helpL1Desc: 'Basic layer assessing fundamental aspects of information.',
    helpL1PE001: '001 - Content Assessment',
    helpL1PE001Desc: 'Analysis of the message content in terms of quality and reliability.',
    helpL1PE002: '002 - Source Assessment',
    helpL1PE002Desc: 'Analysis of source credibility and reputation.',
    helpSE001_1: ['Verify if conclusions logically follow from presented facts', 'Identify omitted assumptions or reasoning errors', 'Assess whether arguments support or contradict each other', 'Detect logical manipulation attempts (e.g., false dichotomies, slippery slope)', 'Check if the text contains internal contradictions'],
    helpSE001_2: ['Assess whether the message format is adequate to content (article, video, infographic)', 'Watch for overuse of clickbait, sensationalism, or provocation', 'Check technical quality of material (grammar, video editing, graphics)', 'Assess whether language style is objective or emotional and biased', 'Note excessive use of capital letters, exclamation marks, or dramatic phrasing'],
    helpSE001_3: ['Check if the author is clearly indicated and identifiable', 'Assess whether sources of information and data are provided', 'Verify if potential conflicts of interest or sponsorship are disclosed', 'Check if research methodology or information acquisition methods are explained', 'Assess availability of publication dates and update information'],
    helpSE001_4: ['Verify facts by searching for them in credible external sources', 'Check if numerical data is consistent and verifiable', 'Assess precision of specialized terminology (medical, scientific, legal)', 'Verify if cited studies or documents actually exist and are correctly understood', 'Assess whether data is distinguished from estimates, opinions, and predictions'],
    helpSE001_5: ['Check if only one side or perspective is presented', 'Assess whether important facts or contexts that would change the picture are omitted', 'Watch for biased language, labels, epithets, or tendentious terms', 'Check if opinions or assessments are clearly separated from facts', 'Assess whether alternative viewpoints or expert opinions with different views are presented'],
    helpSE001_6: ['Check metadata of graphic and video files (creation date, editing, origin)', 'Use image analysis tools for manipulation detection (e.g., FotoForensics, InVID)', 'Assess authenticity of faces and voices in video recordings (deepfake)', 'Check if documents have digital signatures or authenticity certificates', 'Verify consistency of shadows, perspective, and lighting in photos'],
    helpSE002_1: ['Check author or source qualifications in the field (education, experience)', 'Assess whether the author is recognizable and cited in the expert community', 'Verify if academic degrees and titles are authentic and from accredited institutions', 'Assess whether the author has published in renowned journals or media', 'Check if the source is not a self-proclaimed "expert" without real qualifications'],
    helpSE002_2: ['Check source publication history in independent fact-checking archives', 'Assess whether the source has negative ratings from fact-checking organizations', 'Check if the source has previously published fake news or disinformation', 'Verify if the source has issued corrections or apologies for errors', 'Assess whether the source is widely cited by credible media'],
    helpSE002_3: ['Check funding sources of the organization or author', 'Assess connections with political parties, lobbyists, or interest groups', 'Identify potential conflicts of interest (e.g., author writes about sponsoring company)', 'Check if the source is dependent on sponsors with a clearly defined agenda', 'Assess transparency of ownership and financial structure of the organization'],
    helpSE002_4: ['Analyze previous source publications for accuracy and reliability', 'Check if the source ignored corrections or criticism of its materials', 'Assess how the source reacted to error detection (corrections, apologies, ignoring)', 'Verify if the source deleted or changed content without explanation', 'Check if the source has a history of information manipulation or violating journalistic standards'],
    helpL2Desc: 'Contextual layer analyzing the broader picture of the situation.',
    helpL2PE003: '003 - Context Assessment',
    helpL2PE003Desc: 'Comprehensive analysis of circumstances of information creation and functioning.',
    helpSE003_1: ['Check publication date and assess if information is current', 'Verify if latest events and updates are included', 'Assess if archival data is not used as current', 'Check if statistics and numerical data come from the appropriate period', 'Watch for old content presented as fresh events (information recycling)'],
    helpSE003_2: ['Assess whether the goal is to inform or persuade to a specific position', 'Identify hidden persuasive or propaganda goals', 'Check if the material has advertising or marketing character', 'Assess whether the author tries to evoke specific emotions (fear, anger, contempt)', 'Watch for clear political, ideological, or commercial agenda'],
    helpSE003_3: ['Identify the target audience of the message', 'Assess whether content is manipulatively adapted to recipient beliefs or emotions', 'Check if different versions of the same information exist for different groups', 'Watch for use of stereotypes, prejudices, or "dog whistles"', 'Assess whether information uncomfortable for the target audience is omitted'],
    helpSE003_4: ['Assess social and political context at the time of publication', 'Check if material refers to current social moods or tensions', 'Watch for cultural and local issues that may affect interpretation', 'Assess whether the author understands the social context or ignores it', 'Check if material may be an attempt to exploit or fuel social conflicts'],
    helpSE003_5: ['Identify potential financial benefits of the author or source', 'Check if material promotes specific products, services, or investments', 'Assess possible political, reputational, or corporate gains', 'Watch for hidden advertisements or business partnerships', 'Check if the author may have personal benefits from the conveyed information'],
    helpSE003_6: ['Assess circumstances of material creation (political pressure, censorship, crisis)', 'Check if the author had full access to information sources', 'Watch for unusual publication timing (e.g., just before elections, during crisis)', 'Assess whether material was created under conditions of limited freedom of speech or coercion', 'Check if natural situational context for publication is missing'],
    helpSE003_7: ['Assess whether material considers situation dynamics and pace of events', 'Check if information was updated in response to new facts', 'Watch for presenting static image of rapidly changing events', 'Assess whether author omits or downplays new information that changes context', 'Check if analysis considers possible situation evolution in the future'],
    helpSE003_8: ['Assess international context and geopolitical relations', 'Check if important international or diplomatic aspects are omitted', 'Watch for one-sided geopolitical perspective', 'Assess whether material considers interests and actions of key international players', 'Check for presence of nationalist or ethnic prejudices in the narrative'],
    helpSE003_9: ['Assess real scale of information dissemination (locally vs globally)', 'Check if reach or impact of event is not exaggerated', 'Watch for artificial inflation of marginal incident significance', 'Assess if data about real information impact is available', 'Check content distribution method (official media, social media, messengers)'],
    helpSE003_10: ['Verify consistency of multimedia materials with text description', 'Check if photos or video actually come from described place and time', 'Use reverse image search to check if material is not archival or from different context', 'Assess technical consistency (e.g., metadata, recording quality, geolocation)', 'Watch for visual context manipulation (e.g., frames cutting out key elements)'],
    helpL3Desc: 'Comparative layer analyzing differences and agreements between sources.',
    helpL3PE004: '004 - Contrast Assessment',
    helpL3PE004Desc: 'Comparison and verification of information from various sources.',
    helpSE004_1: ['Identify facts confirmed by multiple independent sources', 'Assess whether sources are truly independent or cite each other', 'Check if agreement concerns important facts or just details', 'Watch for "echo chamber" effect - duplication of same information', 'Assess quality and credibility of sources confirming information'],
    helpSE004_2: ['Identify factual contradictions between different sources', 'Assess whether discrepancies concern important facts or interpretations', 'Check which source provides more detailed or verifiable information', 'Watch for differences in dates, numbers, or descriptions of key events', 'Assess if discrepancies can be explained by difference in publication time or access to information'],
    helpSE004_3: ['Assess whether you use different types of sources (media, experts, official documents, witnesses)', 'Check if sources represent different perspectives and orientations (political, geographical)', 'Watch for dominance of one type of source (e.g., only media, without experts)', 'Assess whether you have access to primary sources (documents, recordings) or only secondary (articles)', 'Check geographical and cultural diversity of sources'],
    helpSE004_4: ['Check if international perspectives and foreign sources are included', 'Assess whether you rely solely on domestic sources or from one region', 'Watch for selective quoting of foreign sources only when they support local narrative', 'Check if foreign sources are presented in appropriate cultural and political context', 'Assess whether international sources are authentic or disinformation posing as foreign media'],
    
    //SAMOUCZEK - FUNKCJONALNOŚCI
    helpUsageAddComments: 'Adding comments',
    helpUsageAddStep1: 'Find the Secondary Element (SE) you want to analyze',
    helpUsageAddStep2: 'Click on SE card with "+" button',
    helpUsageAddStep3: 'In the dialog enter:',
    helpUsageAddTitle: 'Brief summary (e.g. "Unverified source")',
    helpUsageAddContent: 'Detailed analysis and conclusions',
    helpUsageAddImage: 'Optionally: attach JPG/PNG image (max 5MB)',
    helpUsageAddStep4: 'Click "Save"',
    helpUsageImageNote: 'Comments with attachments are marked with comment and paperclip icons on the model',
    helpUsageEdit: 'Editing and deleting',
    helpUsageEditStep1: 'Click on SE with comment icon to edit comment',
    helpUsageEditStep2: 'In the dialog you can change title and content',
    helpUsageEditStep3: 'Use "Delete" button to remove comment',
    helpUsageRating: 'Rating System',
    helpUsageRatingStep1: 'Click the star icon (★) next to any Secondary Element in Layer I',
    helpUsageRatingStep2: 'Each Secondary Element has an individual rating',
    helpUsageRatingStep3: 'Secondary Element with a rating displays a star icon in a color corresponding to the level',
    helpUsageRatingNote: 'The rating system allows you to quickly mark problematic areas without creating a full comment',
    helpUsageRadar: 'Radar Chart',
    helpUsageRadarStep1: 'Click the "Radar Chart" button in the top menu',
    helpUsageRadarStep2: 'Select the Primary Element (PE) for which you want to see the chart',
    helpUsageRadarStep3: 'The chart will only generate when all Secondary Elements in the given Primary Element have ratings',
    helpUsageRadarStep4: 'You can export the chart as PNG',
    helpUsageRadarNote: 'The radar chart helps visually identify the most problematic areas of analysis',
    helpUsagePDF: 'PDF Export',
    helpUsagePDFStep1: 'Click "Generate PDF" button',
    helpUsagePDFStep2: 'Application will generate report with all comments',
    helpUsagePDFStep3: 'PDF contains:',
    helpUsagePDFItem1: 'List of all comments grouped by layers',
    helpUsagePDFItem2: 'Attached images (if added to comments)',
    helpUsagePDFItem3: 'Image captions (JPG/PNG filename)',
    helpUsagePDFItem4: 'Date and time of report generation',
    helpUsageJSON: 'Export/Import JSON',
    helpUsageJSONExport: 'Export:',
    helpUsageJSONExportStep1: 'Click "Export JSON"',
    helpUsageJSONExportStep2: 'Save file to disk',
    helpUsageJSONImport: 'Import:',
    helpUsageJSONImportStep1: 'Click "Import JSON"',
    helpUsageJSONImportStep2: 'Select previously saved file',
    helpUsageJSONImportStep3: 'All comments will be loaded',
    helpUsageClear: 'Clearing data',
    helpUsageClearDesc: 'Click "Clear All" to remove all comments',
    helpUsageClearConfirm: 'Confirmation will appear before deletion',
    
    //SAMOUCZEK - WSKAZÓWKI
    helpTipsAnalysis: 'Effective analysis',
    helpTipsAnalysisL1: 'First assess the quality of information itself',
    helpTipsAnalysisL2: 'Understand the broader context of the situation',
    helpTipsAnalysisL3: 'Compare with other sources',
    helpTipsComments: 'Creating comments',
    helpTipsCommentsTitle: 'Should be brief and descriptive (2-5 words)',
    helpTipsCommentsContent: 'Include specific facts, observations and conclusions',
    helpTipsCommentsCite: 'If possible, refer to specific sources',
    helpTipsCommentsDate: 'Include dates of events and publications',
    helpTipsOrganization: 'Work organization',
    helpTipsOrgBackup: 'Regularly export JSON as backup',
    helpTipsOrgNaming: 'Use consistent naming convention in titles',
    helpTipsOrgPDF: 'Generate PDF after completing analysis as final report',
    helpTipsOrgFiles: 'For complex analyses create separate JSON files for different topics',
    helpTipsBestPractices: 'Best practices',
    helpTipsBPObjectivity: 'Separate facts from opinions',
    helpTipsBPVerification: 'Verify information in multiple sources',
    helpTipsBPDocumentation: 'Record sources and links in comment content',
    helpTipsBPRegularity: 'Update analysis as new information arrives',
    helpTipsShortcuts: 'Keyboard shortcuts',
    helpTipsShortcutsESC: 'Close open dialog',
    helpTipsShortcutsClick: 'Close without saving',
    
    //DODATKOWE
    note: 'Note',
    objectivity: 'Objectivity',
    verification: 'Verification',
    documentation: 'Documentation',
    regularity: 'Regularity',
    click: 'Click outside dialog',
    
  } 
  
}; // koniec translations

// Funkcja pobierania tłumaczenia
export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['pl'][key] || key;
};
