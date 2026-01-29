//pobieranie tłumaczenia, jeśli brak, zwraca pl domyślnie, jeśli wciąż nie ma zwraca klucz (aby nic nie zostało ukryte w UI)
export const translations = {
  pl: {
    //Nagłówek
    appTitle: 'System Analizy Informacji',
    appSubtitle: '„Punkt widzenia może być niebezpiecznym luksusem, gdy zastępuje wgląd i zrozumienie" — Marshall McLuhan',
    help: 'Pomoc',
    comments: 'Komentarzy',
    changeLanguage: 'Zmień język',
    toggleTheme: 'Przełącz motyw',
    
    //strona startowa
    welcomeTitle: 'Witaj w Systemie Analizy Informacji',
    welcomeSubtitle: 'Wybierz jedną z opcji, aby rozpocząć pracę',
    newProject: 'Nowa analiza',
    newProjectDescription: 'Rozpocznij nową analizę',
    importProject: 'Importuj projekt',
    importProjectDescription: 'Wczytaj wcześniej zapisany projekt z pliku JSON',
    footerText: 'Model Weryfikacji Informacji VeriQ',
    invalidFileType: 'Nieprawidłowy typ pliku. Wybierz plik JSON.',
    invalidJSON: 'Błąd odczytu pliku JSON. Upewnij się, że plik jest prawidłowy.',
    
    //toolbar
    generatePDF: 'Generuj PDF',
    radarChart: 'Wykres radarowy',
    exportJSON: 'Eksport JSON',
    importJSON: 'Importuj JSON',
    clearAll: 'Wyczyść wszystko',
    backToHome: 'Powrót do strony głównej',
    confirmBackToHome: 'Czy na pewno chcesz wrócić do strony głównej? Niezapisane zmiany zostaną zachowane w pamięci przeglądarki.',
    
    //dialog z tytułem i autorem przy generowaniu pdf
    pdfDialogTitle: 'Personalizacja raportu PDF',
    pdfReportTitleLabel: 'Tytuł raportu',
    pdfReportTitlePlaceholder: 'np. Analiza potencjalnej dezinformacji XYZ',
    pdfAuthorLabel: 'Autor raportu',
    pdfAuthorPlaceholder: 'np. Jan Kowalski',
    pdfGenerateButton: 'Generuj PDF',
    pdfCancelButton: 'Anuluj',
    pdfValidationError: 'Proszę wypełnić wszystkie pola',
    pdfPrimaryElement: 'Element nadrzędny',
    pdfSecondaryElement: 'Element podrzędny',
    
    //dialogwykresu radarowego
    radarTitle: 'Wykres radarowy ocen',
    radarSelectPE: 'Wybierz element:',
    radarPE001: 'Element nadrzędny 001 - Ocena treści',
    radarPE002: 'Element nadrzędny 002 - Ocena źródła',
    radarExportPNG: 'Eksport PNG',
    radarClose: 'Zamknij',
    radarNoData: 'Brak kompletnych danych',
    radarNoDataDesc: 'Aby wygenerować wykres, wszystkie Elementy podrzędne w wybranym Elemencie nadrzędnym muszą mieć oceny (0-5).',
    radarMissingRatings: 'Brakujące oceny w',
    radarExportSuccess: 'Wykres wyeksportowany do PNG',
    radarExportError: 'Błąd podczas eksportu',
    
    //widok źródeł w 004
    sourcesAddBtn: 'Dodaj źródło',
    sourcesNoSources: 'Brak źródeł. Kliknij "Dodaj źródło" aby rozpocząć.',
    sourcesDeleteSource: 'Usuń źródło',
    sourcesConfirmDelete: 'Czy na pewno chcesz usunąć to źródło?',
    sourcesWillBeDeleted: 'Zostanie usunięte wraz ze wszystkimi komentarzami.',
    
    //dialog dodawania nowego źródła w 004
    sourceDialogTitle: 'Dodaj nowe źródło',
    sourceDialogNameLabel: 'Nazwa źródła',
    sourceDialogNamePlaceholder: 'Wpisz nazwę źródła (np. "Reuters", "Demagog.org", "BBC News")',
    sourceDialogCancel: 'Anuluj',
    sourceDialogAdd: 'Dodaj źródło',
    
    //nazwy warstw
    layer1: 'Warstwa I - Jakość Informacji',
    layer2: 'Warstwa II - Kontekst',
    layer3: 'Warstwa III - Kontrast',
    
    //elementy nadrzędne (PE)
    pe001: 'Ocena treści',
    pe002: 'Ocena źródła',
    pe003: 'Ocena kontekstu',
    pe004: 'Ocena kontrastu',
    
    //elementy podrzędne (SE)
    se001_1: 'Spójność logiczna',
    se001_2: 'Forma przekazu',
    se001_3: 'Transparentność',
    se001_4: 'Rzetelność',
    se001_5: 'Obiektywność',
    se001_6: 'Autentyczność cyfrowa',
    
    se002_1: 'Autorytet',
    se002_2: 'Reputacja',
    se002_3: 'Afiliacja',
    se002_4: 'Historia Wiarygodności',
    
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
    
    se004_1: 'Zgodności',
    se004_2: 'Rozbieżności',
    se004_3: 'Różnorodność',
    se004_4: 'Kontekst międzynarodowy',
    
    //opisy elementów podrzędnych (SE)
    seDesc_001_1: 'Ocenia zgodność logiczną przekazu i poprawność wnioskowania',
    seDesc_001_2: 'Ocenia język, styl, ton oraz ich dopasowanie do tematu',
    seDesc_001_3: 'Ocenia jawność źródeł, metodologii i możliwości weryfikacji',
    seDesc_001_4: 'Ocenia poprawność faktów, danych i terminologii',
    seDesc_001_5: 'Ocenia, czy przekaz jest bezstronny i wolny od manipulacji',
    seDesc_001_6: 'Ocenia wiarygodność materiałów cyfrowych',
    
    seDesc_002_1: 'Ocenia poziom kompetencji i uznania źródła w danej dziedzinie',
    seDesc_002_2: 'Ocenia postrzeganie źródła w innych wiarygodnych kanałach',
    seDesc_002_3: 'Ocenia powiązania organizacyjne, finansowe i polityczne źródła',
    seDesc_002_4: 'Ocenia wcześniejszą rzetelność źródła',
    
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
    
    seDesc_004_1: 'Ocenia wspólne elementy między różnymi źródłami',
    seDesc_004_2: 'Ocenia sprzeczności między źródłami',
    seDesc_004_3: 'Ocenia pluralizm źródeł i perspektyw',
    seDesc_004_4: 'Ocenia selekcję zagranicznych danych',
    
    //wskazówki dla elementów podrzędnych (SE)
    seHints_001_1: ['Wnioski nie wynikają z przedstawionych faktów', 'Fałszywe związki przyczynowo-skutkowe', 'Wybiera tylko wygodne fakty („cherry-picking")', 'Są wewnętrzne sprzeczności', 'Brakuje kroków rozumowania („skacze" od tezy do tezy)'],
    seHints_001_2: ['Format nie pasuje do treści (np. clickbait)', 'Nadmierne użycie emocjonalnych słów', 'Wyolbrzymienia lub dramatyzowanie', 'Niska jakość grafiki lub wideo', 'Chaotyczna struktura tekstu'],
    seHints_001_3: ['Brak informacji o autorze', 'Nie podano źródeł danych', 'Ukryte sponsorowanie lub konflikt interesów', 'Metodologia badań jest niejasna', 'Brak dat publikacji lub aktualizacji'],
    seHints_001_4: ['Błędne lub niespójne dane liczbowe', 'Nieprecyzyjna terminologia', 'Cytowanie badań bez kontekstu', 'Brak rozróżnienia między danymi a szacunkami', 'Uproszczenia prowadzące do zniekształceń'],
    seHints_001_5: ['Jednostronny opis sytuacji', 'Pomija istotne fakty lub konteksty', 'Używa stronniczego języka', 'Przedstawia opinie jako fakty', 'Brak alternatywnych punktów widzenia'],
    seHints_001_6: ['Podejrzane metadane plików', 'Ślady edycji w dokumentach cyfrowych', 'Niezgodność dat utworzenia/modyfikacji', 'Brak cyfrowych sygnatur lub certyfikatów', 'Manipulacja obrazów (deepfake, photoshop)'],
    
    seHints_002_1: ['Brak wykształcenia lub doświadczenia w temacie', 'Nie jest rozpoznawalny w branży', 'Samozwańczy „ekspert" bez kwalifikacji', 'Pseudonaukowe stopnie lub tytuły', 'Znany z kontrowersyjnych poglądów'],
    seHints_002_2: ['Źródło ma złą reputację medialną', 'Brak cytowań w wiarygodnych źródłach', 'Historia rozpowszechniania dezinformacji', 'Powielanie niesprawdzonych treści', 'Brak korekt po ujawnieniu błędów'],
    seHints_002_3: ['Ukryte powiązania z grupami interesu', 'Finansowanie z nieprzejrzystych źródeł', 'Związki z partiami politycznymi lub lobbystami', 'Zależność od sponsorów', 'Konflikt interesów'],
    seHints_002_4: ['Powtarzające się błędy w przeszłych publikacjach', 'Ignorowanie sprostowań lub krytyki', 'Brak reakcji na wykryte nieścisłości', 'Historia manipulacji informacją', 'Usuwanie lub zmienianie treści bez wyjaśnienia'],
    
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
    
    seHints_004_1: ['Tylko jedno źródło podaje informację', 'Brak potwierdzenia w innych źródłach', 'Zgodność tylko w nieistotnych szczegółach', 'Wzajemne cytowanie tych samych źródeł', 'Echo chamber'],
    seHints_004_2: ['Sprzeczne fakty w różnych źródłach', 'Różne daty lub liczby', 'Odmienne interpretacje tych samych wydarzeń', 'Wykluczające się wersje', 'Niemożliwe do pogodzenia relacje'],
    seHints_004_3: ['Źródła pochodzą z jednego środowiska', 'Brak perspektyw alternatywnych', 'Powielanie tych samych narracji', 'Efekt echo-chamber', 'Brak różnorodności geograficznej'],
    seHints_004_4: ['Wybiórcze cytowanie zagranicznych źródeł', 'Ignorowanie niewygodnych danych międzynarodowych', 'Używanie przykładów zagranicznych do manipulacji', 'Wzmacnianie lokalnej narracji kosztem pełnego obrazu', 'Brak kontekstu kulturowego lub politycznego'],
    
    //nagłówki paneli opisu
    whatWeEvaluate: 'Co oceniamy:',
    warningSignals: 'Sygnały, na które warto zwrócić uwagę:',
    warningSignalsShort: 'Sygnały ostrzegawcze:',
    
    //dialog komentarza
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
    save: 'Zapisz',
    delete: 'Usuń',
    cancel: 'Anuluj',
    
    //wyskakujące powiadomienia
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
    
    //pdf
    pdfTitle: 'Raport Analizy Informacji',
    pdfGenerated: 'Raport PDF wygenerowany pomyślnie',
    pdfGenerateError: 'Błąd podczas generowania PDF',
    pdfComments: 'Komentarze',
    pdfNoComments: 'Brak komentarzy w tej warstwie',
    
    //dialog samouczka
    helpTitle: 'Samouczek',
    helpClose: 'Zamknij',
    
    //sekcje samouczka
    helpIntroTitle: 'Wprowadzenie',
    helpL1Title: 'Warstwa I - Jakość Informacji',
    helpL2Title: 'Warstwa II - Szersze tło',
    helpL3Title: 'Warstwa III - Zestawienie źródeł',
    helpUsageTitle: 'Funkcje aplikacji',
    helpTipsTitle: 'Wskazówki',
    
    //zawartość samouczka
    helpIntroHeading: 'System Analizy Taktyk i Technik Cyberbezpieczeństwa',
    helpIntroDesc: 'Aplikacja pozwala na systematyczną analizę informacji w trzech warstwach hierarchicznych:',
    helpIntroL1: 'Ocena treści i źródła informacji',
    helpIntroL2: 'Analiza kontekstu społecznego i geopolitycznego',
    helpIntroL3: 'Porównanie różnych źródeł informacji',
    helpHowToUse: 'Jak używać aplikacji:',
    helpStep1: 'Kliknij na dowolny Element podrzędny (EP) z przyciskiem \"+\"',
    helpStep2: 'Dodaj tytuł i treść komentarza',
    helpStep3: 'Zapisz komentarz - zostanie oznaczony ikoną komentarza',
    helpStep4: 'Eksportuj analizę do PDF lub JSON',
    helpStep5: 'Importuj wcześniej zapisane analizy z JSON',
    helpNote: 'Tylko Elementy podrzędne (EP) są klikalne i mogą zawierać komentarze. Elementy nadrzędne (EN) służą jako nagłówki kategorii.',
    
    //zawartość samouczka - Warstwa 1 (L1)
    helpL1Desc: 'Warstwa podstawowa oceniająca fundamentalne aspekty informacji.',
    helpL1PE001: '001 - Ocena treści',
    helpL1PE001Desc: 'Analiza samej treści przekazu pod kątem jakości i rzetelności.',
    helpL1PE002: '002 - Ocena źródła',
    helpL1PE002Desc: 'Analiza wiarygodności i reputacji źródła informacji.',
    
    //opis elementów podrzędnych w samouczku (SE)
    helpSE001_1: 'Weryfikacja logicznej spójności argumentów i brak wewnętrznych sprzeczności.',
    helpSE001_2: 'Ocena sposobu prezentacji informacji (tekst, wideo, grafika).',
    helpSE001_3: 'Jawność źródeł, metod pozyskania danych i ewentualnych ograniczeń.',
    helpSE001_4: 'Dokładność faktów, weryfikowalność danych i solidność podstaw.',
    helpSE001_5: 'Bezstronność prezentacji, brak manipulacji i tendencyjności.',
    helpSE001_6: 'Weryfikacja autentyczności dokumentów cyfrowych, brak manipulacji technicznych.',
    
    helpSE002_1: 'Poziom kompetencji i uznania w danej dziedzinie.',
    helpSE002_2: 'Historia publikacji, oceny społeczne i opinie ekspertów.',
    helpSE002_3: 'Powiązania organizacyjne, finansowe i polityczne źródła.',
    helpSE002_4: 'Wcześniejsze publikacje, ich trafność i korekty błędów.',
    
    //zawartość samouczka - Warstwa 2 (L2)
    helpL2Desc: 'Warstwa kontekstowa analizująca szerszy obraz sytuacji.',
    helpL2PE003: '003 - Ocena kontekstu',
    helpL2PE003Desc: 'Kompleksowa analiza okoliczności powstania i funkcjonowania informacji.',
    
    helpSE003_1: 'Czy informacja jest aktualna, jej data publikacji i ewentualne uaktualnienia.',
    helpSE003_2: 'Intencje autora: informować, przekonywa, manipulować czy bawić.',
    helpSE003_3: 'Grupa docelowa przekazu i dostosowanie treści do odbiorcy.',
    helpSE003_4: 'Kontekst społeczny, kulturowy i ekonomiczny w momencie publikacji.',
    helpSE003_5: 'Interesy finansowe, polityczne lub osobiste związane z przekazem.',
    helpSE003_6: 'Warunki i okoliczności powstania informacji.',
    helpSE003_7: 'Zmienność sytuacji, tempo wydarzeń i ewolucja informacji.',
    helpSE003_8: 'Międzynarodowe aspekty sytuacji, relacje między państwami.',
    helpSE003_9: 'Skala rozpowszechnienia informacji i jej wpływ.',
    helpSE003_10: 'Techniczne aspekty przekazu: format, jakość, kanały dystrybucji.',
    
    //zawartość samouczka - Warstwa 3 (L3)
    helpL3Desc: 'Warstwa porównawcza analizująca różnice i zgodności między źródłami.',
    helpL3PE004: '004 - Ocena kontrastu',
    helpL3PE004Desc: 'Porównanie i weryfikacja informacji z różnych źródeł.',
    
    helpSE004_1: 'Punkty wspólne między różnymi źródłami, potwierdzenie faktów.',
    helpSE004_2: 'Różnice w relacjach, sprzeczne informacje wymagające wyjaśnienia.',
    helpSE004_3: 'Zróżnicowanie typów źródeł: media, eksperci, dokumenty,świadkowie.',
    helpSE004_4: 'Międzynarodowy wymiar źródeł, perspektywy różnych krajów.',
    
    //zawartoścć samouczka - Funkcjonalności
    helpUsageAddComments: 'Dodawanie komentarzy',
    helpUsageAddStep1: 'Znajdź Element podrzędny (EP), który chcesz przeanalizować',
    helpUsageAddStep2: 'Kliknij na kartę EP z przyciskiem "+"',
    helpUsageAddStep3: 'W oknie dialogowym wprowadź:',
    helpUsageAddTitle: 'Krótkie podsumowanie (np. "Źródło niezweryfikowane")',
    helpUsageAddContent: 'Szczegółowa analiza i wnioski',
    helpUsageAddImage: 'Opcjonalnie: załącz obraz JPG/PNG (max 5MB)',
    helpUsageAddStep4: 'Kliknij "Zapisz"',
    helpUsageImageNote: 'Komentarze z załącznikami są oznaczone ikoną komentarza i spinacza na matrycy',
    
    helpUsageEdit: 'Edycja i usuwanie',
    helpUsageEditStep1: 'Kliknij na EP z ikoną komentarza aby edytować komentarz',
    helpUsageEditStep2: 'W oknie dialogowym możesz zmienić tytuł i treść',
    helpUsageEditStep3: 'Użyj przycisku "Usuń" aby usunąć komentarz',
    
    helpUsageRating: 'System ocen',
    helpUsageRatingStep1: 'Kliknij ikonę gwiazdki (★) przy dowolnym Elemencie podrzędnym w Warstwie I',
    helpUsageRatingStep2: 'Każdy Element podrzędny ma indywidualną ocenę',
    helpUsageRatingStep3: 'Element podrzędny z oceną wyświetla ikonę gwiazdki w kolorze odpowiadającym poziomowi',
    helpUsageRatingNote: 'System ocen pozwala szybko oznaczyć problematyczne obszary bez tworzenia pełnego komentarza',
    
    helpUsageRadar: 'Wykres radarowy',
    helpUsageRadarStep1: 'Kliknij przycisk "Wykres radarowy" w górnym menu',
    helpUsageRadarStep2: 'Wybierz Element nadrzędny (PE), dla którego chcesz zobaczyć wykres',
    helpUsageRadarStep3: 'Wykres wygeneruje się tylko gdy wszystkie Elementy podrzędne w danym Elemencie nadrzędnym mają oceny',
    helpUsageRadarStep4: 'Możesz eksportować wykres jako PNG',
    helpUsageRadarNote: 'Wykres radarowy pomaga wizualnie zidentyfikować najbardziej problematyczne obszary analizy',
    
    helpUsagePDF: 'Eksport do PDF',
    helpUsagePDFStep1: 'Kliknij przycisk "Generuj PDF"',
    helpUsagePDFStep2: 'Aplikacja wygeneruje raport z wszystkimi komentarzami',
    helpUsagePDFStep3: 'PDF zawiera:',
    helpUsagePDFItem1: 'Listę wszystkich komentarzy pogrupowanych wg warstw',
    helpUsagePDFItem2: 'Załączone obrazy (jeśli dodane do komentarzy)',
    helpUsagePDFItem3: 'Podpisy pod obrazami (nazwa pliku JPG/PNG)',
    helpUsagePDFItem4: 'Datę i godzinę generowania raportu',
    
    helpUsageJSON: 'Eksport/Import JSON',
    helpUsageJSONExport: 'Eksport:',
    helpUsageJSONExportStep1: 'Kliknij "Eksportuj JSON"',
    helpUsageJSONExportStep2: 'Zapisz plik na dysku',
    helpUsageJSONImport: 'Import:',
    helpUsageJSONImportStep1: 'Kliknij "Importuj JSON"',
    helpUsageJSONImportStep2: 'Wybierz wcześniej zapisany plik',
    helpUsageJSONImportStep3: 'Wszystkie komentarze zostaną wczytane',
    
    helpUsageClear: 'Czyszczenie danych',
    helpUsageClearDesc: 'Kliknij "Wyczyść wszystko" aby usunąć wszystkie komentarze',
    helpUsageClearConfirm: 'Pojawi się potwierdzenie przed usunięciem',
    
    //zawartość samouczka - Wskazówki
    helpTipsAnalysis: 'Efektywna analiza',
    helpTipsAnalysisL1: 'Najpierw oceń jakość samej informacji',
    helpTipsAnalysisL2: 'Zrozum szerszy kontekst sytuacji',
    helpTipsAnalysisL3: 'Porównaj z innymi źródłami',
    
    helpTipsComments: 'Tworzenie komentarzy',
    helpTipsCommentsTitle: 'Powinien być krótki i opisowy (2-5 słów)',
    helpTipsCommentsContent: 'Zawieraj konkretne fakty, obserwacje i wnioski',
    helpTipsCommentsCite: 'Jeśli możliwe, odnoś się do konkretnych źródeł',
    helpTipsCommentsDate: 'Uwzględnij daty wydarzeń i publikacji',
    
    helpTipsOrganization: 'Organizacja pracy',
    helpTipsOrgBackup: 'Regularnie eksportuj JSON jako backup',
    helpTipsOrgNaming: 'Używaj spójnej konwencji nazewnictwa w tytułach',
    helpTipsOrgPDF: 'Generuj PDF po zakończeniu analizy jako raport końcowy',
    helpTipsOrgFiles: 'Dla złożonych analiz twórz osobne pliki JSON dla różnych tematów',
    
    helpTipsBestPractices: 'Najlepsze praktyki',
    helpTipsBPObjectivity: 'Oddzielaj fakty od opinii',
    helpTipsBPVerification: 'Sprawdzaj informacje w wielu źródłach',
    helpTipsBPDocumentation: 'Zapisuj źródła i linki w treści komentarzy',
    helpTipsBPRegularity: 'Aktualizuj analizę w miarę napływu nowych informacji',
    
    helpTipsShortcuts: 'Skróty klawiszowe',
    helpTipsShortcutsESC: 'Zamknij otwarty dialog',
    helpTipsShortcutsClick: 'Zamknij bez zapisywania',
    
    //dodatkowe klucze
    note: 'Uwaga',
    objectivity: 'Obiektywność',
    verification: 'Weryfikacja',
    documentation: 'Dokumentacja',
    regularity: 'Regularność',
    click: 'Kliknięcie poza dialog',
  },
  
  en: {
    //nagłówek
    appTitle: 'Information Analysis System',
    appSubtitle: '"Point of view can be a dangerous luxury when substituted for insight and understanding" — Marshall McLuhan',
    help: 'Help',
    comments: 'Comments',
    changeLanguage: 'Change Language',
    toggleTheme: 'Toggle Theme',
    
    //strona startowa
    welcomeTitle: 'Welcome to Information Analysis System',
    welcomeSubtitle: 'Choose one of the options to start working with the system',
    newProject: 'New Project',
    newProjectDescription: 'Start a new analysis from an empty matrix',
    importProject: 'Import Project',
    importProjectDescription: 'Load a previously saved project from a JSON file',
    footerText: 'Cybersecurity Tactics and Techniques Analysis System © 2026',
    invalidFileType: 'Invalid file type. Select a JSON file.',
    invalidJSON: 'JSON file read error. Make sure the file is valid.',
    
    //toolbar
    generatePDF: 'Generate PDF',
    radarChart: 'Radar Chart',
    exportJSON: 'Export JSON',
    importJSON: 'Import JSON',
    clearAll: 'Clear All',
    backToHome: 'Back to Home',
    confirmBackToHome: 'Are you sure you want to go back to the home page? Unsaved changes will be retained in browser memory.',
    
    //dialog z tytułem i autorem przy generowaniu pdf 
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
    
    //dialog wykresu radarowego
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
    
    //widok źródel 004
    sourcesAddBtn: 'Add Source',
    sourcesNoSources: 'No sources. Click "Add Source" to start.',
    sourcesDeleteSource: 'Delete Source',
    sourcesConfirmDelete: 'Are you sure you want to delete this source?',
    sourcesWillBeDeleted: 'Will be deleted along with all comments.',
    
    //dialog dodawania żródeł 004
    sourceDialogTitle: 'Add New Source',
    sourceDialogNameLabel: 'Source Name',
    sourceDialogNamePlaceholder: 'Enter source name (e.g. "Reuters", "TVN24", "BBC News")',
    sourceDialogCancel: 'Cancel',
    sourceDialogAdd: 'Add Source',
    
    //nazwy warstw
    layer1: 'Layer I - Information Quality',
    layer2: 'Layer II - Broader Context',
    layer3: 'Layer III - Source Comparison',
    
    //elementy nadrzędne (PE)
    pe001: 'Content Assessment',
    pe002: 'Source Assessment',
    pe003: 'Context Assessment',
    pe004: 'Contrast Assessment',
    
    //elementy podrzędne (SE)
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
    
    //opisy elementów podrzędnych (SE)
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
    
    //wskazówki dla elementów podrzędnych (SE)
    seHints_001_1: ['Conclusions do not follow from presented facts', 'Author confuses cause with effect', 'Selects only convenient facts („cherry-picking")', 'Internal contradictions exist', 'Steps of reasoning are missing („jumps" from thesis to thesis)'],
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
    
    //nagłówki paneli opisu
    whatWeEvaluate: 'What we evaluate:',
    warningSignals: 'Signals to watch out for:',
    warningSignalsShort: 'Warning signals:',
    
    //dialog komentarza
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
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
    
    //wyskakujące powiadomienia
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
    
    //PDF
    pdfTitle: 'Information Analysis Report',
    pdfGenerated: 'PDF report generated successfully',
    pdfGenerateError: 'Error generating PDF',
    pdfComments: 'Comments',
    pdfNoComments: 'No comments in this layer',
    
    //samouczek
    helpTitle: 'Tutorial',
    helpClose: 'Close',
    
    //sekcje samouczka
    helpIntroTitle: 'Introduction',
    helpL1Title: 'Layer I - Information Quality',
    helpL2Title: 'Layer II - Broader Context',
    helpL3Title: 'Layer III - Source Comparison',
    helpUsageTitle: 'Application Features',
    helpTipsTitle: 'Tips',
    
    //zawartość samouczka - wstęp
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
    
    //zawartość samouczka - Warstwa 1 (L1)
    helpL1Desc: 'Basic layer assessing fundamental aspects of information.',
    helpL1PE001: '001 - Content Assessment',
    helpL1PE001Desc: 'Analysis of the message content in terms of quality and reliability.',
    helpL1PE002: '002 - Source Assessment',
    helpL1PE002Desc: 'Analysis of source credibility and reputation.',
    
    //zawartość samouczka - opis elementów podrzędnych (SE) w Warstwie 1
    helpSE001_1: 'Verification of logical consistency of arguments and absence of internal contradictions.',
    helpSE001_2: 'Assessment of information presentation method (text, video, graphics).',
    helpSE001_3: 'Openness of sources, data acquisition methods and potential limitations.',
    helpSE001_4: 'Accuracy of facts, data verifiability and solid foundation.',
    helpSE001_5: 'Unbiased presentation, lack of manipulation and bias.',
    helpSE001_6: 'Verification of digital document authenticity, absence of technical manipulation.',
    
    helpSE002_1: 'Level of competence and recognition in the field.',
    helpSE002_2: 'Publication history, social ratings and expert opinions.',
    helpSE002_3: 'Organizational, financial and political connections of the source.',
    helpSE002_4: 'Previous publications, their accuracy and error corrections.',
    
    //zawartość samouczka - Warstwa 2 (L2)
    helpL2Desc: 'Contextual layer analyzing the broader picture of the situation.',
    helpL2PE003: '003 - Context Assessment',
    helpL2PE003Desc: 'Comprehensive analysis of circumstances of information creation and functioning.',
    
    helpSE003_1: 'Whether information is current, its publication date and potential updates.',
    helpSE003_2: "Author's intentions: to inform, persuade, manipulate or entertain.",
    helpSE003_3: 'Target audience of the message and content adaptation to the recipient.',
    helpSE003_4: 'Social, cultural and economic context at the time of publication.',
    helpSE003_5: 'Financial, political or personal interests related to the message.',
    helpSE003_6: 'Conditions and circumstances of information creation.',
    helpSE003_7: 'Situation variability, pace of events and information evolution.',
    helpSE003_8: 'International aspects of the situation, relations between states.',
    helpSE003_9: 'Scale of information dissemination and its impact.',
    helpSE003_10: 'Technical aspects of the message: format, quality, distribution channels.',
    
    //zawartość samouczka - Warstwa 3 (L3)
    helpL3Desc: 'Comparative layer analyzing differences and agreements between sources.',
    helpL3PE004: '004 - Contrast Assessment',
    helpL3PE004Desc: 'Comparison and verification of information from various sources.',
    
    helpSE004_1: 'Common points between different sources, fact confirmation.',
    helpSE004_2: 'Differences in reports, conflicting information requiring clarification.',
    helpSE004_3: 'Diversity of source types: media, experts, documents, witnesses.',
    helpSE004_4: 'International dimension of sources, perspectives of different countries.',
    
    //zawartość samouczka - Funkcjonalności
    helpUsageAddComments: 'Adding comments',
    helpUsageAddStep1: 'Find the Secondary Element (SE) you want to analyze',
    helpUsageAddStep2: 'Click on SE card with "+" button',
    helpUsageAddStep3: 'In the dialog enter:',
    helpUsageAddTitle: 'Brief summary (e.g. "Unverified source")',
    helpUsageAddContent: 'Detailed analysis and conclusions',
    helpUsageAddImage: 'Optionally: attach JPG/PNG image (max 5MB)',
    helpUsageAddStep4: 'Click "Save"',
    helpUsageImageNote: 'Comments with attachments are marked with comment and paperclip icons on the matrix',
    
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
    
    //zawartość samouczka - wskazówki
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
    
    //dodatkowe klucze
    note: 'Note',
    objectivity: 'Objectivity',
    verification: 'Verification',
    documentation: 'Documentation',
    regularity: 'Regularity',
    click: 'Click outside dialog',
  }
};

//funkcja pomocnicza do pobierania tłumaczeń (wartość dla języka i klucza)
export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['pl'][key] || key;
};