// Переводы интерфейса на русский и азербайджанский языки

export type Language = 'ru' | 'az';

export interface Translations {
  // Главный экран
  appTitle: string;
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
  accuracy: string;
  totalScore: string;
  bestStreak: string;
  playAgain: string;
  backToMenu: string;
  saveResult: string;
  enterName: string;
  
  // Импорт вопросов
  importTitle: string;
  importDescription: string;
  dragDrop: string;
  orClick: string;
  downloadTemplate: string;
  questionsLoaded: string;
  importError: string;
  close: string;
  
  // Таблица рейтингов
  leaderboardTitle: string;
  rank: string;
  player: string;
  date: string;
  noResults: string;
  clearHistory: string;
  
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
    accuracy: "Точность",
    totalScore: "Итого очков",
    bestStreak: "Лучшая серия",
    playAgain: "Играть снова",
    backToMenu: "В меню",
    saveResult: "Сохранить результат",
    enterName: "Введите имя",
    
    importTitle: "Импорт вопросов",
    importDescription: "Загрузите JSON-файл с вопросами",
    dragDrop: "Перетащите файл сюда",
    orClick: "или нажмите для выбора",
    downloadTemplate: "Скачать шаблон",
    questionsLoaded: "вопросов загружено",
    importError: "Ошибка импорта",
    close: "Закрыть",
    
    leaderboardTitle: "Таблица рейтингов",
    rank: "Место",
    player: "Игрок",
    date: "Дата",
    noResults: "Пока нет результатов",
    clearHistory: "Очистить историю",
    
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
    accuracy: "Dəqiqlik",
    totalScore: "Ümumi xal",
    bestStreak: "Ən yaxşı seriya",
    playAgain: "Yenidən oyna",
    backToMenu: "Menyuya",
    saveResult: "Nəticəni saxla",
    enterName: "Adınızı daxil edin",
    
    importTitle: "Sualları idxal et",
    importDescription: "Suallarla JSON faylı yükləyin",
    dragDrop: "Faylı bura sürükləyin",
    orClick: "və ya seçmək üçün klikləyin",
    downloadTemplate: "Şablonu yüklə",
    questionsLoaded: "sual yükləndi",
    importError: "İdxal xətası",
    close: "Bağla",
    
    leaderboardTitle: "Reytinq cədvəli",
    rank: "Yer",
    player: "Oyunçu",
    date: "Tarix",
    noResults: "Hələ nəticə yoxdur",
    clearHistory: "Tarixçəni təmizlə",
    
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
