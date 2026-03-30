export const translations = {
  pl: {
    // Header
    appTitle: 'Model Weryfikacji Informacji',
    appSubtitle: '„Punkt widzenia może być niebezpiecznym luksusem, gdy zastępuje wgląd i zrozumienie" — Marshall McLuhan',
    help: 'Pomoc',
    comments: 'Komentarzy',
    changeLanguage: 'Zmień język',
    toggleTheme: 'Przełącz motyw',
    
    // Landing Page
    welcomeTitle: 'Witaj w Modelu Weryfikacji Informacji',
    welcomeSubtitle: 'Wybierz jedną z opcji, aby rozpocząć pracę z systemem',
    newProject: 'Nowy projekt',
    newProjectDescription: 'Rozpocznij nową analizę od pustej matrycy',
    importProject: 'Importuj projekt',
    importProjectDescription: 'Wczytaj wcześniej zapisany projekt z pliku JSON',
    footerText: 'Model Weryfikacji Informacji (Information Verification Model) © 2026',
    invalidFileType: 'Nieprawidłowy typ pliku. Wybierz plik JSON.',
    invalidJSON: 'Błąd odczytu pliku JSON. Upewnij się, że plik jest prawidłowy.',
    
    // Toolbar
    generatePDF: 'Generuj PDF',
    radarChart: 'Wykres radarowy',
    exportJSON: 'Eksport JSON',
    importJSON: 'Importuj JSON',
    clearAll: 'Wyczyść wszystko',
    backToHome: 'Powrót do strony głównej',
    confirmBackToHome: 'Czy na pewno chcesz wrócić do strony głównej? Niezapisane zmiany zostaną zachowane w pamięci przeglądarki.',
    
    // PDF Configuration Dialog
    pdfDialogTitle: 'Konfiguracja raportu PDF',
    pdfReportTitleLabel: 'Tytuł raportu',
    pdfReportTitlePlaceholder: 'np. Analiza kampanii dezinformacyjnej XYZ',
    pdfAuthorLabel: 'Autor raportu',
    pdfAuthorPlaceholder: 'np. Jan Kowalski',
    pdfGenerateButton: 'Generuj PDF',
    pdfCancelButton: 'Anuluj',
    pdfValidationError: 'Proszę wypełnić wszystkie pola',
    pdfPrimaryElement: 'Element nadrzędny',
    pdfSecondaryElement: 'Element podrzędny',
    
    // Radar Chart Dialog
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
    
    // Sources View
    sourcesAddBtn: 'Dodaj źródło',
    sourcesNoSources: 'Brak źródeł. Kliknij "Dodaj źródło" aby rozpocząć.',
    sourcesDeleteSource: 'Usuń źródło',
    sourcesConfirmDelete: 'Czy na pewno chcesz usunąć to źródło?',
    sourcesWillBeDeleted: 'Zostanie usunięte wraz ze wszystkimi komentarzami.',
    
    // Source Dialog
    sourceDialogTitle: 'Dodaj nowe źródło',
    sourceDialogNameLabel: 'Nazwa źródła',
    sourceDialogNamePlaceholder: 'Wpisz nazwę źródła (np. "Reuters", "TVN24", "BBC News")',
    sourceDialogCancel: 'Anuluj',
    sourceDialogAdd: 'Dodaj źródło',
    
    // Layers
    layer1: 'Warstwa I - Jakość Informacji',
    layer2: 'Warstwa II - Szersze tło',
    layer3: 'Warstwa III - Zestawienie źródeł',
    
    // Elementy nadrzędne (Primary Elements)
    pe001: 'Ocena treści',
    pe002: 'Ocena źródła',
    pe003: 'Ocena kontekstu',
    pe004: 'Ocena kontrastu',
    
    // Elementy podrzędne (Secondary Elements)
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
    se003_10: 'Spójność techniczna przekazu',
    se004_1: 'Zgodności',
    se004_2: 'Rozbieżności',
    se004_3: 'Różnorodność',
    se004_4: 'Kontekst międzynarodowy',

    // Descs and Hints
    whatWeEvaluate: 'Co oceniamy:',
    warningSignals: 'Sygnały ostrzegawcze:',
    warningSignalsShort: 'Sygnały:',
    
    // Comment Dialog
    commentTitle: 'Komentarz',
    titlePlaceholder: 'Wpisz tytuł (opcjonalnie)',
    contentPlaceholder: 'Wpisz analizę (opcjonalnie)',
    imagesLabel: 'Obrazy',
    imagesHint: 'Możesz dodać zrzuty ekranu lub inne obrazy',
    noFileChosen: 'Nie wybrano pliku',
    imageLabel: 'Obraz',
    
    commentSaved: 'Komentarz zapisany!',
    commentDeleted: 'Komentarz usunięty',
    ratingSaved: 'Ocena zapisana!',
    ratingDeleted: 'Ocena usunięta',
    exportSuccess: 'Wyeksportowano JSON!',
    importSuccess: 'Zaimportowano JSON!',
    importError: 'Błąd importu JSON',
    confirmClear: 'Czy na pewno wyczyścić wszystko?',
    clearSuccess: 'Wyczyszczono dane',
    generatePDF: 'Generowanie PDF',
    pdfGenerated: 'PDF gotowy',
    pdfGenerateError: 'Błąd PDF',
    save: 'Zapisz',
    delete: 'Usuń',
    cancel: 'Anuluj',
    ratingLabel: 'Ocena (0-5)',
    contentLabel: 'Analiza',
    titleLabel: 'Tytuł',
    noRating: 'Brak oceny',
    uploadedImages: 'Obrazy',
    chooseFiles: 'Dodaj pliki',
    filesSelected: 'pliki',
    pdfPrimaryElement: 'EN',
    pdfSecondaryElement: 'EP',
    pdfNoComments: 'Brak analizy w tej sekcji',
    pdfTitle: 'Raport VeriQ',
    helpTitle: 'Samouczek',
    backToHome: 'Powrót',
    note: 'Uwaga',
    objectivity: 'Obiektywność',
    verification: 'Weryfikacja',
    documentation: 'Dokumentacja',
    regularity: 'Regularność',
    click: 'Kliknięcie',
    
    // Help Dialog - Main Sections
    helpIntroTitle: 'Wprowadzenie',
    helpL1Title: 'Warstwa I - Jakość Informacji',
    helpL2Title: 'Warstwa II - Szersze tło',
    helpL3Title: 'Warstwa III - Zestawienie źródeł',
    helpUsageTitle: 'Instrukcja użytkowania',
    helpTipsTitle: 'Wskazówki i porady',
    helpClose: 'Zamknij',
    
    // Help Dialog - Intro Section
    helpIntroHeading: 'Model VeriQ',
    helpIntroDesc: 'Model VeriQ to trójwarstwowy system weryfikacji informacji, który pozwala na systematyczną analizę wiarygodności treści.',
    helpIntroL1: 'Ocena jakości samej treści',
    helpIntroL2: 'Analiza szerszego kontekstu',
    helpIntroL3: 'Porównanie różnych źródeł',
    helpHowToUse: 'Jak korzystać z aplikacji',
    helpStep1: 'Kliknij komórkę w modelu, aby dodać komentarz lub ocenę',
    helpStep2: 'Wypełnij formularz komentarza (tytuł, analiza, obrazy)',
    helpStep3: 'Dodaj ocenę w skali 0-5 dla każdego elementu',
    helpStep4: 'Użyj wykresu radarowego do wizualizacji wyników',
    helpStep5: 'Wygeneruj raport PDF z kompletną analizą',
    helpNote: 'Wszystkie dane są automatycznie zapisywane w pamięci przeglądarki',
    
    // Help Dialog - Layer 1
    helpL1Desc: 'Pierwsza warstwa koncentruje się na ocenie jakości samej informacji - jej treści i źródła.',
    helpL1PE001: 'Element nadrzędny 001 - Ocena treści',
    helpL1PE001Desc: 'Analiza struktury, formy i wiarygodności przekazu informacyjnego.',
    helpL1PE002: 'Element nadrzędny 002 - Ocena źródła',
    helpL1PE002Desc: 'Ocena wiarygodności i reputacji źródła informacji.',
    
    // Help Dialog - Layer 2
    helpL2Desc: 'Druga warstwa analizuje szerszy kontekst - cel, odbiorcę i okoliczności powstania informacji.',
    helpL2PE003: 'Element nadrzędny 003 - Ocena kontekstu',
    helpL2PE003Desc: 'Analiza kontekstowa informacji, jej cel i okoliczności powstania.',
    
    // Help Dialog - Layer 3
    helpL3Desc: 'Trzecia warstwa porównuje różne źródła i sprawdza spójność informacji.',
    helpL3PE003: 'Element nadrzędny 004 - Ocena kontrastu',
    helpL3PE004Desc: 'Porównanie i weryfikacja informacji z różnych źródeł.',
    
    // Help Dialog - Secondary Elements - How to Check (Fact-checking guide)
    helpSE001_1: [
      'Połącz fakty z wnioskiem własnymi słowami',
      'Usuń emocjonalne fragmenty i sprawdź, czy logika nadal działa',
      'Sprawdź, czy nie brakuje kroków rozumowania'
    ],
    helpSE001_2: [
      'Sprawdź, czy tytuł nie jest bardziej emocjonalny niż treść',
      'Porównaj styl z tematem (czy nie jest przesadnie dramatyczny?)',
      'Zobacz, czy forma nie wprowadza w błąd (np. clickbait)'
    ],
    helpSE001_3: [
      'Kliknij podane źródła i sprawdź, czy istnieją',
      'Sprawdź, czy podano autora i datę',
      'Zobacz, czy można samodzielnie zweryfikować dane'
    ],
    helpSE001_4: [
      'Porównaj dane z innymi źródłami',
      'Sprawdź liczby i terminy (czy są spójne?)',
      'Zobacz, czy nie ma uproszczeń zniekształcających sens'
    ],
    helpSE001_5: [
      'Sprawdź, czy pokazano więcej niż jedną stronę tematu',
      'Zobacz, czy nie pominięto istotnych faktów',
      'Oddziel opinie od faktów'
    ],
    helpSE001_6: [
      'Sprawdź źródło obrazu lub wideo (np. wyszukiwarka obrazów)',
      'Zobacz, czy materiał nie był wcześniej używany w innym kontekście',
      'Zwróć uwagę na ślady edycji lub manipulacji'
    ],
    helpSE002_1: [
      'Sprawdź kim jest autor (wykształcenie, doświadczenie)',
      'Zobacz, czy wypowiada się w swojej dziedzinie',
      'Poszukaj jego innych publikacji'
    ],
    helpSE002_2: [
      'Wyszukaj źródło i sprawdź opinie o nim',
      'Zobacz, czy cytują je inne wiarygodne media',
      'Sprawdź, czy było krytykowane za błędy lub dezinformację'
    ],
    helpSE002_3: [
      'Sprawdź, kto finansuje lub wspiera źródło',
      'Zobacz powiązania polityczne lub biznesowe',
      'Zastanów się, czy te powiązania mogą wpływać na treść'
    ],
    helpSE002_4: [
      'Sprawdź wcześniejsze publikacje źródła',
      'Zobacz, czy koryguje błędy',
      'Sprawdź, czy reaguje na krytykę'
    ],
    helpSE003_1: [
      'Sprawdź datę publikacji i aktualizacji',
      'Porównaj z najnowszymi informacjami',
      'Zobacz, czy nie użyto przestarzałych danych'
    ],
    helpSE003_2: [
      'Zastanów się, co autor chce osiągnąć',
      'Sprawdź, czy treść wywołuje silne emocje',
      'Zobacz, czy nie próbuje Cię do czegoś przekonać'
    ],
    helpSE003_3: [
      'Określ, do kogo jest skierowana tre��ć',
      'Zobacz, czy język jest dopasowany do konkretnej grupy',
      'Sprawdź, czy nie wykorzystuje stereotypów'
    ],
    helpSE003_4: [
      'Zastanów się, jakie są obecne nastroje społeczne',
      'Sprawdź, czy treść na nich gra',
      'Zobacz, czy nie ignoruje ważnego kontekstu społecznego'
    ],
    helpSE003_5: [
      'Zastanów się, kto może zyskać na tej informacji',
      'Sprawdź, czy promowane są konkretne produkty lub idee',
      'Zobacz, czy autor może mieć ukryte korzyści'
    ],
    helpSE003_6: [
      'Sprawdź, w jakich warunkach powstała treść',
      'Zobacz, czy mogła być tworzona pod presją',
      'Uwzględnij ograniczony dostęp do informacji'
    ],
    helpSE003_7: [
      'Sprawdź datę publikacji',
      'Poszukaj nowszych informacji na ten temat',
      'Zobacz, czy treść była aktualizowana'
    ],
    helpSE003_8: [
      'Sprawdź, czy uwzględniono kontekst międzynarodowy',
      'Zobacz, czy nie pokazano tylko jednej perspektywy',
      'Porównaj z zagranicznymi źródłami'
    ],
    helpSE003_9: [
      'Sprawdź, jak szeroko informacja się rozprzestrzeniła',
      'Zobacz, czy jej znaczenie nie jest wyolbrzymione',
      'Porównaj z rzeczywistym wpływem wydarzenia'
    ],
    helpSE003_10: [
      'Sprawdź, czy materiały pasują do opisu',
      'Zobacz, czy zgadza się czas i miejsce',
      'Sprawdź, czy nie użyto archiwalnych materiałów'
    ],
    helpSE004_1: [
      'Znajdź inne źródła tej samej informacji',
      'Sprawdź, czy są od siebie niezależne',
      'Zobacz, czy potwierdzają kluczowe fakty'
    ],
    helpSE004_2: [
      'Porównaj różne źródła',
      'Zwróć uwagę na różnice w danych i interpretacji',
      'Sprawdź, które źródło podaje pełniejszy obraz'
    ],
    helpSE004_3: [
      'Sprawdź źródła z różnych środowisk i krajów',
      'Zobacz, czy prezentują różne perspektywy',
      'Sprawdź, czy nie powielają tej samej narracji'
    ],
    helpSE004_4: [
      'Znajdź oryginalne zagraniczne źródła',
      'Sprawdź, czy nie pominięto części informacji',
      'Porównaj, jak temat opisują media w innych krajach'
    ],
    
    // Help Dialog - Usage Instructions
    helpUsageAddComments: 'Dodawanie komentarzy',
    helpUsageAddStep1: 'Kliknij na komórkę w modelu',
    helpUsageAddStep2: 'Otworzy się okno dialogowe komentarza',
    helpUsageAddStep3: 'Wypełnij pola:',
    helpUsageAddTitle: 'Krótki tytuł komentarza',
    helpUsageAddContent: 'Szczegółowa analiza elementu',
    helpUsageAddImage: 'Dodaj zrzuty ekranu lub dowody',
    helpUsageAddStep4: 'Kliknij "Zapisz" aby zapisać komentarz',
    
    helpUsageEdit: 'Edycja i usuwanie',
    helpUsageEditStep1: 'Kliknij na komórkę z istniejącym komentarzem',
    helpUsageEditStep2: 'Możesz edytować treść lub dodać więcej obrazów',
    helpUsageEditStep3: 'Użyj przycisku "Usuń" aby usunąć komentarz',
    
    helpUsageRating: 'Dodawanie ocen',
    helpUsageRatingStep1: 'Kliknij na komórkę w kolumnie "Ocena"',
    helpUsageRatingStep2: 'Wybierz ocenę w skali 0-5',
    helpUsageRatingStep3: 'Ocena zostanie zapisana automatycznie',
    
    helpUsageRadar: 'Wykres radarowy',
    helpUsageRadarStep1: 'Kliknij przycisk "Wykres radarowy" w pasku narzędzi',
    helpUsageRadarStep2: 'Wybierz element nadrzędny do wizualizacji',
    helpUsageRadarStep3: 'Wykres pokaże oceny wszystkich elementów podrzędnych',
    helpUsageRadarStep4: 'Użyj "Eksport PNG" aby zapisać wykres',
    
    helpUsagePDF: 'Generowanie raportu PDF',
    helpUsagePDFStep1: 'Kliknij przycisk "Generuj PDF" w pasku narzędzi',
    helpUsagePDFStep2: 'Wypełnij formularz konfiguracji (tytuł, autor)',
    helpUsagePDFStep3: 'Raport PDF zawiera:',
    helpUsagePDFItem1: 'Stronę tytułową z metadanymi',
    helpUsagePDFItem2: 'Wszystkie komentarze z obrazami',
    helpUsagePDFItem3: 'Wykresy radarowe dla każdego elementu nadrzędnego',
    helpUsagePDFItem4: 'Automatyczne łamanie stron',
    
    helpUsageJSON: 'Eksport i import projektów',
    helpUsageJSONExport: 'Eksport do JSON:',
    helpUsageJSONExportStep1: 'Kliknij "Eksport JSON" w pasku narzędzi',
    helpUsageJSONExportStep2: 'Plik zostanie zapisany z nazwą zawierającą datę',
    
    helpUsageJSONImport: 'Import z JSON:',
    helpUsageJSONImportStep1: 'Kliknij "Importuj JSON" w pasku narzędzi',
    helpUsageJSONImportStep2: 'Wybierz wcześniej zapisany plik JSON',
    helpUsageJSONImportStep3: 'Wszystkie dane zostaną przywrócone',
    
    helpUsageClear: 'Czyszczenie danych',
    helpUsageClearDesc: 'Przycisk "Wyczyść wszystko" usuwa wszystkie komentarze i oceny',
    helpUsageClearConfirm: 'Wymagane jest potwierdzenie przed usunięciem',
    
    // Help Dialog - Tips
    helpTipsAnalysis: 'Strategie analizy',
    helpTipsAnalysisL1: 'Zacznij od oceny treści i źródła',
    helpTipsAnalysisL2: 'Następnie przeanalizuj kontekst',
    helpTipsAnalysisL3: 'Na koniec porównaj z innymi źródłami',
    
    helpTipsComments: 'Dobre praktyki komentowania',
    helpTipsCommentsTitle: 'Używaj opisowych tytułów',
    helpTipsCommentsContent: 'Dokumentuj swoje rozumowanie',
    helpTipsCommentsCite: 'Cytuj konkretne fragmenty tekstu',
    helpTipsCommentsDate: 'Dodawaj daty i źródła',
    
    helpTipsOrganization: 'Organizacja pracy',
    helpTipsOrgBackup: 'Regularnie eksportuj projekt do JSON',
    helpTipsOrgNaming: 'Używaj opisowych nazw plików',
    helpTipsOrgPDF: 'Generuj raporty PDF na końcowych etapach',
    helpTipsOrgFiles: 'Przechowuj dowody w osobnym folderze',
    
    helpTipsBestPractices: 'Najlepsze praktyki weryfikacji',
    helpTipsBPObjectivity: 'Zachowuj obiektywizm w analizie',
    helpTipsBPVerification: 'Weryfikuj każdą istotną informację',
    helpTipsBPDocumentation: 'Dokumentuj wszystkie znaleziska',
    helpTipsBPRegularity: 'Regularnie aktualizuj analizę',
    
    helpTipsShortcuts: 'Skróty klawiszowe',
    helpTipsShortcutsESC: 'Zamyka okno dialogowe',
    helpTipsShortcutsClick: 'Otwiera komentarz lub ocenę'
  },
  en: {
    appTitle: 'Information Verification Model',
    appSubtitle: 'VeriQ Information Analysis System',
    help: 'Help',
    comments: 'Comments',
    changeLanguage: 'Change Language',
    toggleTheme: 'Toggle Theme',
    welcomeTitle: 'Welcome to VeriQ',
    welcomeSubtitle: 'Verification through structure',
    newProject: 'New Project',
    newProjectDescription: 'Start analysis from scratch',
    importProject: 'Import Project',
    importProjectDescription: 'Load existing analysis',
    footerText: 'VeriQ © 2026',
    generatePDF: 'Export PDF',
    radarChart: 'Radar Analysis',
    exportJSON: 'Save Project',
    importJSON: 'Open Project',
    clearAll: 'Clear Data',
    backToHome: 'Home',
    
    // Comment Dialog
    commentTitle: 'Comment',
    titlePlaceholder: 'Enter title (optional)',
    contentPlaceholder: 'Enter analysis (optional)',
    imagesLabel: 'Images',
    imagesHint: 'You can add screenshots or other images',
    noFileChosen: 'No file chosen',
    titleLabel: 'Title',
    contentLabel: 'Analysis',
    ratingLabel: 'Rating (0-5)',
    chooseFiles: 'Choose files',
    filesSelected: 'files',
    uploadedImages: 'Images',
    
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
    commentSaved: 'Comment saved!',
    commentDeleted: 'Comment deleted',
    ratingSaved: 'Rating saved!',
    ratingDeleted: 'Rating deleted',
    exportSuccess: 'Exported to JSON!',
    importSuccess: 'Project loaded!',
    importError: 'Import error',
    confirmClear: 'Delete everything?',
    clearSuccess: 'Data cleared',
    pdfGenerated: 'PDF ready',
    pdfGenerateError: 'PDF error',
    
    pe001: 'Content',
    pe002: 'Source',
    pe003: 'Context',
    pe004: 'Contrast',
    whatWeEvaluate: 'Evaluation:',
    warningSignals: 'Warning Signals:',
    warningSignalsShort: 'Signals:',
    note: 'Note',
    objectivity: 'Objectivity',
    verification: 'Verification',
    documentation: 'Documentation',
    regularity: 'Regularity',
    click: 'Click',
    
    // Help Dialog - Main Sections
    helpIntroTitle: 'Introduction',
    helpL1Title: 'Layer I - Information Quality',
    helpL2Title: 'Layer II - Broader Context',
    helpL3Title: 'Layer III - Source Comparison',
    helpUsageTitle: 'User Guide',
    helpTipsTitle: 'Tips & Best Practices',
    helpClose: 'Close',
    
    // Help Dialog - Intro Section
    helpIntroHeading: 'VeriQ Model',
    helpIntroDesc: 'VeriQ is a three-layer information verification system that enables systematic credibility analysis.',
    helpIntroL1: 'Content quality assessment',
    helpIntroL2: 'Broader context analysis',
    helpIntroL3: 'Multiple source comparison',
    helpHowToUse: 'How to use the application',
    helpStep1: 'Click a cell in the model to add a comment or rating',
    helpStep2: 'Fill out the comment form (title, analysis, images)',
    helpStep3: 'Add ratings on a 0-5 scale for each element',
    helpStep4: 'Use radar charts to visualize results',
    helpStep5: 'Generate PDF reports with complete analysis',
    helpNote: 'All data is automatically saved in browser storage',
    
    // Help Dialog - Layer 1
    helpL1Desc: 'The first layer focuses on assessing the information itself - its content and source.',
    helpL1PE001: 'Primary Element 001 - Content Assessment',
    helpL1PE001Desc: 'Analysis of structure, form, and credibility of the information.',
    helpL1PE002: 'Primary Element 002 - Source Assessment',
    helpL1PE002Desc: 'Assessment of source credibility and reputation.',
    
    // Help Dialog - Layer 2
    helpL2Desc: 'The second layer analyzes broader context - purpose, audience, and circumstances.',
    helpL2PE003: 'Primary Element 003 - Context Assessment',
    helpL2PE003Desc: 'Contextual analysis of information, its purpose and circumstances.',
    
    // Help Dialog - Layer 3
    helpL3Desc: 'The third layer compares different sources and checks information consistency.',
    helpL3PE003: 'Primary Element 004 - Contrast Assessment',
    helpL3PE004Desc: 'Comparison and verification of information from different sources.',
    
    // Help Dialog - Secondary Elements - How to Check (Fact-checking guide)
    helpSE001_1: [
      'Connect facts to conclusion in your own words',
      'Remove emotional fragments and check if logic still holds',
      'Check if any reasoning steps are missing'
    ],
    helpSE001_2: [
      'Check if title is more emotional than content',
      'Compare style with topic (is it overly dramatic?)',
      'See if format is misleading (e.g., clickbait)'
    ],
    helpSE001_3: [
      'Click provided sources and check if they exist',
      'Check if author and date are provided',
      'See if data can be independently verified'
    ],
    helpSE001_4: [
      'Compare data with other sources',
      'Check numbers and dates (are they consistent?)',
      'See if simplifications distort meaning'
    ],
    helpSE001_5: [
      'Check if more than one side of the topic is shown',
      'See if important facts were omitted',
      'Separate opinions from facts'
    ],
    helpSE001_6: [
      'Check image or video source (e.g., reverse image search)',
      'See if material was previously used in different context',
      'Look for signs of editing or manipulation'
    ],
    helpSE002_1: [
      'Check who the author is (education, experience)',
      'See if they speak within their field of expertise',
      'Look for their other publications'
    ],
    helpSE002_2: [
      'Search for the source and check opinions about it',
      'See if cited by other credible media',
      'Check if criticized for errors or misinformation'
    ],
    helpSE002_3: [
      'Check who funds or supports the source',
      'See political or business connections',
      'Consider if these connections might influence content'
    ],
    helpSE002_4: [
      'Check source\'s previous publications',
      'See if they correct errors',
      'Check if they respond to criticism'
    ],
    helpSE003_1: [
      'Check publication and update dates',
      'Compare with latest information',
      'See if outdated data was used'
    ],
    helpSE003_2: [
      'Consider what author wants to achieve',
      'Check if content evokes strong emotions',
      'See if trying to persuade you of something'
    ],
    helpSE003_3: [
      'Identify who the content is aimed at',
      'See if language is tailored to specific group',
      'Check if stereotypes are used'
    ],
    helpSE003_4: [
      'Consider current social moods',
      'Check if content plays on them',
      'See if important social context is ignored'
    ],
    helpSE003_5: [
      'Consider who might benefit from this information',
      'Check if specific products or ideas are promoted',
      'See if author might have hidden benefits'
    ],
    helpSE003_6: [
      'Check under what conditions content was created',
      'See if it might have been created under pressure',
      'Consider limited access to information'
    ],
    helpSE003_7: [
      'Check publication date',
      'Look for newer information on the topic',
      'See if content was updated'
    ],
    helpSE003_8: [
      'Check if international context is considered',
      'See if only one perspective is shown',
      'Compare with foreign sources'
    ],
    helpSE003_9: [
      'Check how widely information spread',
      'See if its significance is exaggerated',
      'Compare with actual event impact'
    ],
    helpSE003_10: [
      'Check if materials match description',
      'See if time and place match',
      'Check if archival materials were used'
    ],
    helpSE004_1: [
      'Find other sources of same information',
      'Check if they are independent from each other',
      'See if they confirm key facts'
    ],
    helpSE004_2: [
      'Compare different sources',
      'Note differences in data and interpretation',
      'Check which source provides fuller picture'
    ],
    helpSE004_3: [
      'Check sources from different backgrounds and countries',
      'See if they present different perspectives',
      'Check if they repeat same narrative'
    ],
    helpSE004_4: [
      'Find original foreign sources',
      'Check if parts of information were omitted',
      'Compare how media in other countries describe topic'
    ],
    
    // Help Dialog - Usage Instructions
    helpUsageAddComments: 'Adding comments',
    helpUsageAddStep1: 'Click on a cell in the model',
    helpUsageAddStep2: 'Comment dialog will open',
    helpUsageAddStep3: 'Fill in the fields:',
    helpUsageAddTitle: 'Brief comment title',
    helpUsageAddContent: 'Detailed element analysis',
    helpUsageAddImage: 'Add screenshots or evidence',
    helpUsageAddStep4: 'Click "Save" to save the comment',
    
    helpUsageEdit: 'Editing and deleting',
    helpUsageEditStep1: 'Click on a cell with existing comment',
    helpUsageEditStep2: 'You can edit content or add more images',
    helpUsageEditStep3: 'Use "Delete" button to remove comment',
    
    helpUsageRating: 'Adding ratings',
    helpUsageRatingStep1: 'Click on a cell in "Rating" column',
    helpUsageRatingStep2: 'Select rating on 0-5 scale',
    helpUsageRatingStep3: 'Rating will be saved automatically',
    
    helpUsageRadar: 'Radar chart',
    helpUsageRadarStep1: 'Click "Radar Chart" button in toolbar',
    helpUsageRadarStep2: 'Select primary element to visualize',
    helpUsageRadarStep3: 'Chart will show ratings of all secondary elements',
    helpUsageRadarStep4: 'Use "Export PNG" to save chart',
    
    helpUsagePDF: 'Generating PDF report',
    helpUsagePDFStep1: 'Click "Generate PDF" button in toolbar',
    helpUsagePDFStep2: 'Fill configuration form (title, author)',
    helpUsagePDFStep3: 'PDF report includes:',
    helpUsagePDFItem1: 'Title page with metadata',
    helpUsagePDFItem2: 'All comments with images',
    helpUsagePDFItem3: 'Radar charts for each primary element',
    helpUsagePDFItem4: 'Automatic page breaks',
    
    helpUsageJSON: 'Project export and import',
    helpUsageJSONExport: 'Export to JSON:',
    helpUsageJSONExportStep1: 'Click "Export JSON" in toolbar',
    helpUsageJSONExportStep2: 'File will be saved with date in filename',
    
    helpUsageJSONImport: 'Import from JSON:',
    helpUsageJSONImportStep1: 'Click "Import JSON" in toolbar',
    helpUsageJSONImportStep2: 'Select previously saved JSON file',
    helpUsageJSONImportStep3: 'All data will be restored',
    
    helpUsageClear: 'Clearing data',
    helpUsageClearDesc: '"Clear all" button removes all comments and ratings',
    helpUsageClearConfirm: 'Confirmation is required before deletion',
    
    // Help Dialog - Tips
    helpTipsAnalysis: 'Analysis strategies',
    helpTipsAnalysisL1: 'Start with content and source assessment',
    helpTipsAnalysisL2: 'Then analyze context',
    helpTipsAnalysisL3: 'Finally compare with other sources',
    
    helpTipsComments: 'Comment best practices',
    helpTipsCommentsTitle: 'Use descriptive titles',
    helpTipsCommentsContent: 'Document your reasoning',
    helpTipsCommentsCite: 'Quote specific text fragments',
    helpTipsCommentsDate: 'Add dates and sources',
    
    helpTipsOrganization: 'Work organization',
    helpTipsOrgBackup: 'Regularly export project to JSON',
    helpTipsOrgNaming: 'Use descriptive file names',
    helpTipsOrgPDF: 'Generate PDF reports at final stages',
    helpTipsOrgFiles: 'Keep evidence in separate folder',
    
    helpTipsBestPractices: 'Verification best practices',
    helpTipsBPObjectivity: 'Maintain objectivity in analysis',
    helpTipsBPVerification: 'Verify every significant piece of information',
    helpTipsBPDocumentation: 'Document all findings',
    helpTipsBPRegularity: 'Regularly update analysis',
    
    helpTipsShortcuts: 'Keyboard shortcuts',
    helpTipsShortcutsESC: 'Closes dialog',
    helpTipsShortcutsClick: 'Opens comment or rating'
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['pl']?.[key] || key;
};