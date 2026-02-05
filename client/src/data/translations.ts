// Переводы интерфейса на русский и азербайджанский языки

export type Language = 'ru' | 'az';

export interface Translations {
  // Главный экран
  appTitle: string;
  appShortTitle: string;
  appSubtitle: string;
  startTraining: string;
  mode25: string;
  mode50: string;
  questionsCount: string;
  questions: string;
  timer: string;
  seconds: string;
  importQuestions: string;
  leaderboard: string;
  selectMode: string;
  secPerQuestion: string;
  pointsForSpeed: string;
  answerStreaks: string;
  questionsInfo: string;
  totalInDatabase: string;
  custom: string;
  
  // Игровой экран
  question: string;
  of: string;
  score: string;
  streak: string;
  timeLeft: string;
  nextQuestion: string;
  correct: string;
  incorrect: string;
  timeUp: string;
  correctAnswer: string;
  
  // Экран результатов
  trainingComplete: string;
  yourResult: string;
  correctAnswers: string;
  incorrectAnswers: string;
  accuracy: string;
  totalScore: string;
  totalQuestionsLabel: string;
  bestStreak: string;
  playAgain: string;
  backToMenu: string;
  saveResult: string;
  enterName: string;
  showResults: string;
  footerHint: string;
  resultExcellent: string;
  resultGreat: string;
  resultGood: string;
  resultOk: string;
  resultTryAgain: string;
  resultMotivationHigh: string;
  resultMotivationMid: string;
  resultMotivationLow: string;
  
  // Импорт вопросов
  importTitle: string;
  importDescription: string;
  dragDrop: string;
  importDropHere: string;
  orClick: string;
  downloadTemplate: string;
  questionsLoaded: string;
  importError: string;
  close: string;
  importWrongFormat: string;
  importCustomDeleted: string;
  importTemplateDownloaded: string;
  importQuestionField: string;
  importOptionsField: string;
  importCorrectField: string;
  importCategoryField: string;
  importDifficultyField: string;
  importClearAll: string;
  importErrorQuestionText: string;
  importErrorOptions: string;
  importErrorCorrectAnswer: string;
  importErrorCategory: string;
  importErrorDifficulty: string;
  importErrorInvalidJson: string;
  importErrorInvalidStructure: string;
  importErrorEmpty: string;
  importErrorGeneric: string;
  importSuccess: string;
  
  // Таблица рейтингов
  leaderboardTitle: string;
  leaderboardDescription: string;
  leaderboardTop: string;
  leaderboardHistory: string;
  leaderboardPlayToRank: string;
  leaderboardHistoryEmpty: string;
  leaderboardHistoryHint: string;
  leaderboardChangeName: string;
  leaderboardSaveName: string;
  leaderboardNamePlaceholder: string;
  leaderboardClearGlobal: string;
  leaderboardClearConfirm: string;
  leaderboardNameSaved: string;
  leaderboardCleared: string;
  rank: string;
  player: string;
  date: string;
  noResults: string;
  clearHistory: string;

  // Авторизация
  authLogin: string;
  authLogout: string;
  authContinueGoogle: string;
  authGuest: string;
  authLoginCta: string;

  // Системные экраны
  notFoundTitle: string;
  notFoundSubtitle: string;
  notFoundDescription: string;
  notFoundButton: string;
  errorTitle: string;
  errorReload: string;

  // Результаты
  resultSavedOnline: string;
  resultSavedLocal: string;
  resultLoginToSave: string;
  
  // Категории
  categories: {
    history: string;
    geography: string;
    science: string;
    art: string;
    literature: string;
    music: string;
    cinema: string;
    sport: string;
  };
  
  // Уровни сложности
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    appTitle: "Кто хочет стать миллионером?",
    appShortTitle: "Тренажёр",
    appSubtitle: "Протестируй свои знания и навыки",
    startTraining: "Начать тренировку",
    mode25: "25 вопросов",
    mode50: "50 вопросов",
    questionsCount: "вопросов",
    questions: "вопросов",
    timer: "Таймер",
    seconds: "сек",
    importQuestions: "Импорт вопросов",
    leaderboard: "Рейтинг",
    selectMode: "Выберите режим",
    secPerQuestion: "сек/вопрос",
    pointsForSpeed: "Очки за скорость",
    answerStreaks: "Серии ответов",
    questionsInfo: "Вопросы охватывают историю, географию, науку, искусство, литературу и другие темы",
    totalInDatabase: "Всего в базе",
    custom: "пользовательских",
    
    question: "Вопрос",
    of: "из",
    score: "Очки",
    streak: "Серия",
    timeLeft: "Осталось",
    nextQuestion: "Следующий вопрос",
    correct: "Правильно!",
    incorrect: "Неправильно",
    timeUp: "Время вышло!",
    correctAnswer: "Правильный ответ",
    
    trainingComplete: "Тренировка завершена!",
    yourResult: "Ваш результат",
    correctAnswers: "Правильных ответов",
    incorrectAnswers: "Неправильных",
    accuracy: "Точность",
    totalScore: "Итого очков",
    totalQuestionsLabel: "Всего вопросов",
    bestStreak: "Лучшая серия",
    playAgain: "Играть снова",
    backToMenu: "В меню",
    saveResult: "Сохранить результат",
    enterName: "Введите имя",
    showResults: "Показать результаты",
    footerHint: "Выбери правильный ответ до истечения времени",
    resultExcellent: "Превосходно!",
    resultGreat: "Отлично!",
    resultGood: "Хорошо!",
    resultOk: "Неплохо",
    resultTryAgain: "Есть над чем работать",
    resultMotivationHigh: "Отличная подготовка! Ты готов к отбору!",
    resultMotivationMid: "Хороший результат! Продолжай тренироваться!",
    resultMotivationLow: "Практика — путь к совершенству. Попробуй ещё раз!",
    
    importTitle: "Импорт вопросов",
    importDescription: "Загрузите JSON-файл с вопросами",
    dragDrop: "Перетащите файл сюда",
    importDropHere: "Отпустите файл",
    orClick: "или нажмите для выбора",
    downloadTemplate: "Скачать шаблон",
    questionsLoaded: "вопросов загружено",
    importError: "Ошибка импорта",
    close: "Закрыть",
    importWrongFormat: "Пожалуйста, выберите файл в формате JSON",
    importCustomDeleted: "Пользовательские вопросы удалены",
    importTemplateDownloaded: "Шаблон скачан",
    importQuestionField: "question — текст вопроса",
    importOptionsField: "options — массив из 4 вариантов",
    importCorrectField: "correctAnswer — индекс (0-3)",
    importCategoryField: "category — категория",
    importDifficultyField: "difficulty — easy/medium/hard",
    importClearAll: "Удалить все",
    importErrorQuestionText: "Вопрос #{{index}}: отсутствует текст вопроса",
    importErrorOptions: "Вопрос #{{index}}: должно быть ровно 4 варианта ответа",
    importErrorCorrectAnswer: "Вопрос #{{index}}: correctAnswer должен быть числом от 0 до 3",
    importErrorCategory: "Вопрос #{{index}}: отсутствует категория",
    importErrorDifficulty: "Вопрос #{{index}}: difficulty должен быть easy, medium или hard",
    importErrorInvalidJson: "Ошибка: файл не является валидным JSON",
    importErrorInvalidStructure: "Ошибка: ожидается массив вопросов или объект с полем \"questions\"",
    importErrorEmpty: "Ошибка: файл не содержит вопросов",
    importErrorGeneric: "Произошла ошибка при импорте файла",
    importSuccess: "Успешно импортировано {{count}} вопросов!",
    
    leaderboardTitle: "Таблица рейтингов",
    leaderboardDescription: "Лучшие результаты и история ваших игр",
    leaderboardTop: "Топ-10",
    leaderboardHistory: "Моя история",
    leaderboardPlayToRank: "Сыграйте, чтобы попасть в рейтинг!",
    leaderboardHistoryEmpty: "История пуста",
    leaderboardHistoryHint: "Ваши результаты появятся здесь",
    leaderboardChangeName: "Изменить",
    leaderboardSaveName: "Сохранить",
    leaderboardNamePlaceholder: "Ваше имя",
    leaderboardClearGlobal: "Очистить рейтинг",
    leaderboardClearConfirm: "Вы уверены, что хотите очистить таблицу рейтингов?",
    leaderboardNameSaved: "Имя сохранено",
    leaderboardCleared: "Таблица рейтингов очищена",
    rank: "Место",
    player: "Игрок",
    date: "Дата",
    noResults: "Пока нет результатов",
    clearHistory: "Очистить историю",

    authLogin: "Войти",
    authLogout: "Выйти",
    authContinueGoogle: "Продолжить с Google",
    authGuest: "Гость",
    authLoginCta: "Зайти в игру",

    notFoundTitle: "404",
    notFoundSubtitle: "Страница не найдена",
    notFoundDescription: "Возможно, она была перемещена или удалена.",
    notFoundButton: "На главную",
    errorTitle: "Произошла неожиданная ошибка.",
    errorReload: "Перезагрузить страницу",

    resultSavedOnline: "Результат сохранён в рейтинг",
    resultSavedLocal: "Результат сохранён локально",
    resultLoginToSave: "Войдите, чтобы сохранить результат в рейтинг",
    
    categories: {
      history: "История",
      geography: "География",
      science: "Наука",
      art: "Искусство",
      literature: "Литература",
      music: "Музыка",
      cinema: "Кино",
      sport: "Спорт"
    },
    
    difficulty: {
      easy: "Лёгкий",
      medium: "Средний",
      hard: "Сложный"
    }
  },
  
  az: {
    appTitle: "Kim milyonçu olmaq istəyir?",
    appShortTitle: "Trenajor",
    appSubtitle: "Biliklərinizi və bacarıqlarınızı sınayın",
    startTraining: "Məşqə başla",
    mode25: "25 sual",
    mode50: "50 sual",
    questionsCount: "sual",
    questions: "sual",
    timer: "Taymer",
    seconds: "san",
    importQuestions: "Sualları idxal et",
    leaderboard: "Reytinq",
    selectMode: "Rejimi seçin",
    secPerQuestion: "san/sual",
    pointsForSpeed: "Sürət üçün xal",
    answerStreaks: "Cavab seriyaları",
    questionsInfo: "Suallar tarixi, coğrafiyanı, elmi, incəsənəti, ədəbiyyatı və digər mövzuları əhatə edir",
    totalInDatabase: "Bazada cəmi",
    custom: "istifadəçi",
    
    question: "Sual",
    of: "/",
    score: "Xal",
    streak: "Seriya",
    timeLeft: "Qalıb",
    nextQuestion: "Növbəti sual",
    correct: "Düzgün!",
    incorrect: "Səhv",
    timeUp: "Vaxt bitdi!",
    correctAnswer: "Düzgün cavab",
    
    trainingComplete: "Məşq tamamlandı!",
    yourResult: "Nəticəniz",
    correctAnswers: "Düzgün cavablar",
    incorrectAnswers: "Səhv cavablar",
    accuracy: "Dəqiqlik",
    totalScore: "Ümumi xal",
    totalQuestionsLabel: "Cəmi sual",
    bestStreak: "Ən yaxşı seriya",
    playAgain: "Yenidən oyna",
    backToMenu: "Menyuya",
    saveResult: "Nəticəni saxla",
    enterName: "Adınızı daxil edin",
    showResults: "Nəticələri göstər",
    footerHint: "Vaxt bitmədən düzgün cavabı seç",
    resultExcellent: "Möhtəşəm!",
    resultGreat: "Əla!",
    resultGood: "Yaxşı!",
    resultOk: "Pis deyil",
    resultTryAgain: "Üzərində işləmək lazımdır",
    resultMotivationHigh: "Əla hazırlıq! Seçimə hazırsan!",
    resultMotivationMid: "Yaxşı nəticə! Məşq etməyə davam et!",
    resultMotivationLow: "Məşq mükəmməlliyə aparır. Yenə sına!",
    
    importTitle: "Sualları idxal et",
    importDescription: "Suallarla JSON faylı yükləyin",
    dragDrop: "Faylı bura sürükləyin",
    importDropHere: "Faylı buraxın",
    orClick: "və ya seçmək üçün klikləyin",
    downloadTemplate: "Şablonu yüklə",
    questionsLoaded: "sual yükləndi",
    importError: "İdxal xətası",
    close: "Bağla",
    importWrongFormat: "Zəhmət olmasa JSON faylı seçin",
    importCustomDeleted: "İstifadəçi sualları silindi",
    importTemplateDownloaded: "Şablon yükləndi",
    importQuestionField: "question — sual mətni",
    importOptionsField: "options — 4 variantdan ibarət massiv",
    importCorrectField: "correctAnswer — indeks (0-3)",
    importCategoryField: "category — kateqoriya",
    importDifficultyField: "difficulty — easy/medium/hard",
    importClearAll: "Hamısını sil",
    importErrorQuestionText: "Sual #{{index}}: sual mətni yoxdur",
    importErrorOptions: "Sual #{{index}}: 4 cavab variantı olmalıdır",
    importErrorCorrectAnswer: "Sual #{{index}}: correctAnswer 0-3 arası rəqəm olmalıdır",
    importErrorCategory: "Sual #{{index}}: kateqoriya yoxdur",
    importErrorDifficulty: "Sual #{{index}}: difficulty easy, medium və ya hard olmalıdır",
    importErrorInvalidJson: "Xəta: fayl düzgün JSON deyil",
    importErrorInvalidStructure: "Xəta: suallar massivi və ya \"questions\" sahəsi gözlənilir",
    importErrorEmpty: "Xəta: faylda sual yoxdur",
    importErrorGeneric: "Fayl idxalı zamanı xəta baş verdi",
    importSuccess: "{{count}} sual uğurla əlavə olundu!",
    
    leaderboardTitle: "Reytinq cədvəli",
    leaderboardDescription: "Ən yaxşı nəticələr və oyun tarixçəniz",
    leaderboardTop: "Top-10",
    leaderboardHistory: "Tarixçəm",
    leaderboardPlayToRank: "Reytinqə düşmək üçün oynayın!",
    leaderboardHistoryEmpty: "Tarixçə boşdur",
    leaderboardHistoryHint: "Nəticələriniz burada görünəcək",
    leaderboardChangeName: "Dəyişdir",
    leaderboardSaveName: "Saxla",
    leaderboardNamePlaceholder: "Adınız",
    leaderboardClearGlobal: "Reytinqi təmizlə",
    leaderboardClearConfirm: "Reytinq cədvəlini təmizləmək istəyirsiniz?",
    leaderboardNameSaved: "Ad saxlanıldı",
    leaderboardCleared: "Reytinq təmizləndi",
    rank: "Yer",
    player: "Oyunçu",
    date: "Tarix",
    noResults: "Hələ nəticə yoxdur",
    clearHistory: "Tarixçəni təmizlə",

    authLogin: "Daxil ol",
    authLogout: "Çıxış",
    authContinueGoogle: "Google ilə davam et",
    authGuest: "Qonaq",
    authLoginCta: "Oyuna daxil ol",

    notFoundTitle: "404",
    notFoundSubtitle: "Səhifə tapılmadı",
    notFoundDescription: "Səhifə köçürülmüş və ya silinmiş ola bilər.",
    notFoundButton: "Əsas səhifə",
    errorTitle: "Gözlənilməz xəta baş verdi.",
    errorReload: "Səhifəni yenilə",

    resultSavedOnline: "Nəticə reytinqə əlavə olundu",
    resultSavedLocal: "Nəticə lokal saxlanıldı",
    resultLoginToSave: "Nəticəni saxlamaq üçün daxil olun",
    
    categories: {
      history: "Tarix",
      geography: "Coğrafiya",
      science: "Elm",
      art: "İncəsənət",
      literature: "Ədəbiyyat",
      music: "Musiqi",
      cinema: "Kino",
      sport: "İdman"
    },
    
    difficulty: {
      easy: "Asan",
      medium: "Orta",
      hard: "Çətin"
    }
  }
};
