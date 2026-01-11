export const translations = {
  pl: {
    // Header
    appTitle: 'System Analizy Informacji',
    appSubtitle: '„Punkt widzenia może być niebezpiecznym luksusem, gdy zastępuje wgląd i zrozumienie" — Marshall McLuhan',
    help: 'Pomoc',
    comments: 'Komentarzy',
    changeLanguage: 'Zmień język',
    toggleTheme: 'Przełącz motyw',
    
    // Landing Page
    welcomeTitle: 'Witaj w Systemie Analizy Informacji',
    welcomeSubtitle: 'Wybierz jedną z opcji, aby rozpocząć pracę z systemem',
    newProject: 'Nowy projekt',
    newProjectDescription: 'Rozpocznij nową analizę od pustej matrycy',
    importProject: 'Importuj projekt',
    importProjectDescription: 'Wczytaj wcześniej zapisany projekt z pliku JSON',
    dragDropHint: 'Lub przeciągnij i upuść plik JSON tutaj',
    aboutSystem: 'O systemie',
    feature1: 'Trzywarstwowa analiza informacji (L1-L3) z hierarchiczną strukturą',
    feature2: 'System ocen (0-5) dla PE 001 i PE 002 z wykresami radarowymi',
    feature3: 'Dynamiczne źródła dla PE 004 z możliwością dodawania komentarzy',
    feature4: 'Eksport do PDF i JSON z pełnym wsparciem dla obrazów i ciemnego motywu',
    footerText: 'System Analizy Taktyk i Technik Cyberbezpieczeństwa © 2026',
    invalidFileType: 'Nieprawidłowy typ pliku. Wybierz plik JSON.',
    invalidJSON: 'Błąd odczytu pliku JSON. Upewnij się, że plik jest prawidłowy.',
    
    // Toolbar
    exportJPEG: 'Eksport JPEG',
    generatePDF: 'Generuj PDF',
    radarChart: 'Wykres radarowy',
    exportJSON: 'Eksport JSON',
    importJSON: 'Importuj JSON',
    clearAll: 'Wyczyść wszystko',
    backToHome: 'Powrót do strony głównej',
    confirmBackToHome: 'Czy na pewno chcesz wrócić do strony głównej? Niezapisane zmiany zostaną zachowane w pamięci przeglądarki.',
    
    // Layers
    layer1: 'L1 - Jakość Informacji',
    layer2: 'L2 - Szersze tło',
    layer3: 'L3 - Zestawienie źródeł',
    
    // Primary Elements
    pe001: '001 Ocena treści',
    pe002: '002 Ocena źródła',
    pe003: '003 Ocena kontekstu',
    pe004: '004 Ocena kontrastu',
    
    // Secondary Elements - Full names
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
    
    // Comment Dialog
    commentTitle: 'Komentarz',
    titleLabel: 'Tytuł',
    titlePlaceholder: 'Krótki tytuł komentarza',
    contentLabel: 'Treść',
    contentPlaceholder: 'Szczegółowy opis, analiza, wnioski...',
    imagesLabel: '📷 Obrazy',
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
    
    // Toast messages
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
    
    // PDF
    pdfTitle: 'Raport Analizy Informacji',
    pdfGenerated: 'Wygenerowano',
    pdfComments: 'Komentarze',
    pdfNoComments: 'Brak komentarzy w tej warstwie',
    
    // Help Dialog
    helpTitle: 'Samouczek',
    helpClose: 'Zamknij',
    
    // Help Sections
    helpIntroTitle: '📖 Wprowadzenie',
    helpL1Title: 'L1 - Jakość Informacji',
    helpL2Title: 'L2 - Szersze tło',
    helpL3Title: 'L3 - Zestawienie źródeł',
    helpUsageTitle: '🔧 Funkcje aplikacji',
    helpTipsTitle: '💡 Wskazówki',
    
    // Help Content - Intro
    helpIntroHeading: 'System Analizy Taktyk i Technik Cyberbezpieczeństwa',
    helpIntroDesc: 'Aplikacja pozwala na systematyczną analizę informacji w trzech warstwach hierarchicznych:',
    helpIntroL1: 'Ocena treści i źródła informacji',
    helpIntroL2: 'Analiza kontekstu społecznego i geopolitycznego',
    helpIntroL3: 'Porównanie różnych źródeł informacji',
    helpHowToUse: 'Jak używać aplikacji:',
    helpStep1: 'Kliknij na dowolny Secondary Element (SE) z przyciskiem "+"',
    helpStep2: 'Dodaj tytuł i treść komentarza',
    helpStep3: 'Zapisz komentarz - zostanie oznaczony ikoną 💬',
    helpStep4: 'Eksportuj analizę do PDF lub JSON',
    helpStep5: 'Importuj wcześniej zapisane analizy z JSON',
    helpNote: 'Tylko Secondary Elements (SE) są klikalne i mogą zawierać komentarze. Primary Elements (PE) służą jako nagłówki kategorii.',
    
    // Help Content - L1
    helpL1Desc: 'Warstwa podstawowa oceniająca fundamentalne aspekty informacji.',
    helpL1PE001: '001 - Ocena treści',
    helpL1PE001Desc: 'Analiza samej treści przekazu pod kątem jakości i rzetelności.',
    helpL1PE002: '002 - Ocena źródła',
    helpL1PE002Desc: 'Analiza wiarygodności i reputacji źródła informacji.',
    
    // SE Descriptions
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
    
    // Help Content - L2
    helpL2Desc: 'Warstwa kontekstowa analizująca szerszy obraz sytuacji.',
    helpL2PE003: '003 - Ocena kontekstu',
    helpL2PE003Desc: 'Kompleksowa analiza okoliczności powstania i funkcjonowania informacji.',
    
    helpSE003_1: 'Czy informacja jest aktualna, jej data publikacji i ewentualne uaktualnienia.',
    helpSE003_2: 'Intencje autora: informować, przekonywać, manipulować czy bawić.',
    helpSE003_3: 'Grupa docelowa przekazu i dostosowanie treści do odbiorcy.',
    helpSE003_4: 'Kontekst społeczny, kulturowy i ekonomiczny w momencie publikacji.',
    helpSE003_5: 'Interesy finansowe, polityczne lub osobiste związane z przekazem.',
    helpSE003_6: 'Warunki i okoliczności powstania informacji.',
    helpSE003_7: 'Zmienność sytuacji, tempo wydarzeń i ewolucja informacji.',
    helpSE003_8: 'Międzynarodowe aspekty sytuacji, relacje między państwami.',
    helpSE003_9: 'Skala rozpowszechnienia informacji i jej wpływ.',
    helpSE003_10: 'Techniczne aspekty przekazu: format, jakość, kanały dystrybucji.',
    
    // Help Content - L3
    helpL3Desc: 'Warstwa porównawcza analizująca różnice i zgodności między źródłami.',
    helpL3PE004: '004 - Ocena kontrastu',
    helpL3PE004Desc: 'Porównanie i weryfikacja informacji z różnych źródeł.',
    
    helpSE004_1: 'Punkty wspólne między różnymi źródłami, potwierdzenie faktów.',
    helpSE004_2: 'Różnice w relacjach, sprzeczne informacje wymagające wyjaśnienia.',
    helpSE004_3: 'Zróżnicowanie typów źródeł: media, eksperci, dokumenty,świadkowie.',
    helpSE004_4: 'Międzynarodowy wymiar źródeł, perspektywy różnych krajów.',
    
    // Help Content - Usage
    helpUsageAddComments: 'Dodawanie komentarzy',
    helpUsageAddStep1: 'Znajdź Secondary Element (SE), który chcesz przeanalizować',
    helpUsageAddStep2: 'Kliknij na kartę SE z przyciskiem "+"',
    helpUsageAddStep3: 'W oknie dialogowym wprowadź:',
    helpUsageAddTitle: 'Krótkie podsumowanie (np. "Źródło niezweryfikowane")',
    helpUsageAddContent: 'Szczegółowa analiza i wnioski',
    helpUsageAddImage: 'Opcjonalnie: załącz obraz JPG/PNG (max 5MB)',
    helpUsageAddStep4: 'Kliknij "💾 Zapisz"',
    helpUsageImageNote: 'Komentarze z załącznikami mają ikonę 💬📎 na matrycy',
    
    helpUsageEdit: 'Edycja i usuwanie',
    helpUsageEditStep1: 'Kliknij na SE z ikoną 💬 aby edytować komentarz',
    helpUsageEditStep2: 'W oknie dialogowym możesz zmienić tytuł i treść',
    helpUsageEditStep3: 'Użyj przycisku "🗑️ Usuń" aby usunąć komentarz',
    
    helpUsagePDF: 'Eksport do PDF',
    helpUsagePDFStep1: 'Kliknij przycisk "📄 Generuj PDF"',
    helpUsagePDFStep2: 'Aplikacja wygeneruje raport z wszystkimi komentarzami',
    helpUsagePDFStep3: 'PDF zawiera:',
    helpUsagePDFItem1: 'Listę wszystkich komentarzy pogrupowanych wg warstw',
    helpUsagePDFItem2: 'Załączone obrazy (jeśli dodane do komentarzy)',
    helpUsagePDFItem3: 'Podpisy pod obrazami (nazwa pliku JPG/PNG)',
    helpUsagePDFItem4: 'Datę i godzinę generowania raportu',
    
    helpUsageJSON: 'Eksport/Import JSON',
    helpUsageJSONExport: 'Eksport:',
    helpUsageJSONExportStep1: 'Kliknij "💾 Eksportuj JSON"',
    helpUsageJSONExportStep2: 'Zapisz plik na dysku',
    helpUsageJSONImport: 'Import:',
    helpUsageJSONImportStep1: 'Kliknij "📥 Importuj JSON"',
    helpUsageJSONImportStep2: 'Wybierz wcześniej zapisany plik',
    helpUsageJSONImportStep3: 'Wszystkie komentarze zostaną wczytane',
    
    helpUsageClear: 'Czyszczenie danych',
    helpUsageClearDesc: 'Kliknij "🗑️ Wyczyść wszystko" aby usunąć wszystkie komentarze',
    helpUsageClearConfirm: 'Pojawi się potwierdzenie przed usunięciem',
    
    // Help Content - Tips
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
    
    // Additional keys
    note: 'Uwaga',
    objectivity: 'Obiektywność',
    verification: 'Weryfikacja',
    documentation: 'Dokumentacja',
    regularity: 'Regularność',
    click: 'Kliknięcie poza dialog',
  },
  
  en: {
    // Header
    appTitle: 'Information Analysis System',
    appSubtitle: '"Point of view can be a dangerous luxury when substituted for insight and understanding" — Marshall McLuhan',
    help: 'Help',
    comments: 'Comments',
    changeLanguage: 'Change Language',
    toggleTheme: 'Toggle Theme',
    
    // Landing Page
    welcomeTitle: 'Welcome to Information Analysis System',
    welcomeSubtitle: 'Choose one of the options to start working with the system',
    newProject: 'New Project',
    newProjectDescription: 'Start a new analysis from an empty matrix',
    importProject: 'Import Project',
    importProjectDescription: 'Load a previously saved project from a JSON file',
    dragDropHint: 'Or drag and drop a JSON file here',
    aboutSystem: 'About the System',
    feature1: 'Three-layer information analysis (L1-L3) with hierarchical structure',
    feature2: 'Rating system (0-5) for PE 001 and PE 002 with radar charts',
    feature3: 'Dynamic sources for PE 004 with the ability to add comments',
    feature4: 'Export to PDF and JSON with full support for images and dark theme',
    footerText: 'Cybersecurity Tactics and Techniques Analysis System © 2026',
    invalidFileType: 'Invalid file type. Select a JSON file.',
    invalidJSON: 'JSON file read error. Make sure the file is valid.',
    
    // Toolbar
    exportJPEG: 'Export JPEG',
    generatePDF: 'Generate PDF',
    radarChart: 'Radar Chart',
    exportJSON: 'Export JSON',
    importJSON: 'Import JSON',
    clearAll: 'Clear All',
    backToHome: 'Back to Home',
    confirmBackToHome: 'Are you sure you want to go back to the home page? Unsaved changes will be retained in browser memory.',
    
    // Layers
    layer1: 'L1 - Information Quality',
    layer2: 'L2 - Broader Context',
    layer3: 'L3 - Source Comparison',
    
    // Primary Elements
    pe001: '001 Content Assessment',
    pe002: '002 Source Assessment',
    pe003: '003 Context Assessment',
    pe004: '004 Contrast Assessment',
    
    // Secondary Elements - Full names
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
    
    // Comment Dialog
    commentTitle: 'Comment',
    titleLabel: 'Title',
    titlePlaceholder: 'Brief comment title',
    contentLabel: 'Content',
    contentPlaceholder: 'Detailed description, analysis, conclusions...',
    imagesLabel: '📷 Images',
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
    
    // Toast messages
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
    
    // PDF
    pdfTitle: 'Information Analysis Report',
    pdfGenerated: 'Generated',
    pdfComments: 'Comments',
    pdfNoComments: 'No comments in this layer',
    
    // Help Dialog
    helpTitle: 'Tutorial',
    helpClose: 'Close',
    
    // Help Sections
    helpIntroTitle: '📖 Introduction',
    helpL1Title: 'L1 - Information Quality',
    helpL2Title: 'L2 - Broader Context',
    helpL3Title: 'L3 - Source Comparison',
    helpUsageTitle: '🔧 Application Features',
    helpTipsTitle: '💡 Tips',
    
    // Help Content - Intro
    helpIntroHeading: 'Cybersecurity Tactics and Techniques Analysis System',
    helpIntroDesc: 'The application allows systematic information analysis in three hierarchical layers:',
    helpIntroL1: 'Content and source assessment',
    helpIntroL2: 'Social and geopolitical context analysis',
    helpIntroL3: 'Comparison of different sources',
    helpHowToUse: 'How to use the application:',
    helpStep1: 'Click on any Secondary Element (SE) with "+" button',
    helpStep2: 'Add title and comment content',
    helpStep3: 'Save comment - it will be marked with 💬 icon',
    helpStep4: 'Export analysis to PDF or JSON',
    helpStep5: 'Import previously saved analyses from JSON',
    helpNote: 'Only Secondary Elements (SE) are clickable and can contain comments. Primary Elements (PE) serve as category headers.',
    
    // Help Content - L1
    helpL1Desc: 'Basic layer assessing fundamental aspects of information.',
    helpL1PE001: '001 - Content Assessment',
    helpL1PE001Desc: 'Analysis of the message content in terms of quality and reliability.',
    helpL1PE002: '002 - Source Assessment',
    helpL1PE002Desc: 'Analysis of source credibility and reputation.',
    
    // SE Descriptions
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
    
    // Help Content - L2
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
    
    // Help Content - L3
    helpL3Desc: 'Comparative layer analyzing differences and agreements between sources.',
    helpL3PE004: '004 - Contrast Assessment',
    helpL3PE004Desc: 'Comparison and verification of information from various sources.',
    
    helpSE004_1: 'Common points between different sources, fact confirmation.',
    helpSE004_2: 'Differences in reports, conflicting information requiring clarification.',
    helpSE004_3: 'Diversity of source types: media, experts, documents, witnesses.',
    helpSE004_4: 'International dimension of sources, perspectives of different countries.',
    
    // Help Content - Usage
    helpUsageAddComments: 'Adding comments',
    helpUsageAddStep1: 'Find the Secondary Element (SE) you want to analyze',
    helpUsageAddStep2: 'Click on SE card with "+" button',
    helpUsageAddStep3: 'In the dialog enter:',
    helpUsageAddTitle: 'Brief summary (e.g. "Unverified source")',
    helpUsageAddContent: 'Detailed analysis and conclusions',
    helpUsageAddImage: 'Optionally: attach JPG/PNG image (max 5MB)',
    helpUsageAddStep4: 'Click "💾 Save"',
    helpUsageImageNote: 'Comments with attachments have 💬📎 icon on the matrix',
    
    helpUsageEdit: 'Editing and deleting',
    helpUsageEditStep1: 'Click on SE with 💬 icon to edit comment',
    helpUsageEditStep2: 'In the dialog you can change title and content',
    helpUsageEditStep3: 'Use "🗑️ Delete" button to remove comment',
    
    helpUsagePDF: 'Export to PDF',
    helpUsagePDFStep1: 'Click "📄 Generate PDF" button',
    helpUsagePDFStep2: 'Application will generate report with all comments',
    helpUsagePDFStep3: 'PDF contains:',
    helpUsagePDFItem1: 'List of all comments grouped by layers',
    helpUsagePDFItem2: 'Attached images (if added to comments)',
    helpUsagePDFItem3: 'Image captions (JPG/PNG filename)',
    helpUsagePDFItem4: 'Date and time of report generation',
    
    helpUsageJSON: 'Export/Import JSON',
    helpUsageJSONExport: 'Export:',
    helpUsageJSONExportStep1: 'Click "💾 Export JSON"',
    helpUsageJSONExportStep2: 'Save file to disk',
    helpUsageJSONImport: 'Import:',
    helpUsageJSONImportStep1: 'Click "📥 Import JSON"',
    helpUsageJSONImportStep2: 'Select previously saved file',
    helpUsageJSONImportStep3: 'All comments will be loaded',
    
    helpUsageClear: 'Clearing data',
    helpUsageClearDesc: 'Click "🗑️ Clear All" to remove all comments',
    helpUsageClearConfirm: 'Confirmation will appear before deletion',
    
    // Help Content - Tips
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
    
    // Additional keys
    note: 'Note',
    objectivity: 'Objectivity',
    verification: 'Verification',
    documentation: 'Documentation',
    regularity: 'Regularity',
    click: 'Click outside dialog',
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['pl'][key] || key;
};