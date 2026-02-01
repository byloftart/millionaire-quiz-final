import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ru' | 'az';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header
    'app.title': 'Тренажёр',
    'app.subtitle': '«Кто хочет стать миллионером?»',
    'app.description': 'Подготовься к отбору на телешоу! Вопросы по общей эрудиции с таймером.',
    
    // Navigation
    'nav.import': 'Импорт вопросов',
    'nav.leaderboard': 'Рейтинг',
    
    // Game modes
    'mode.select': 'Выберите режим:',
    'mode.questions25': '25 вопросов',
    'mode.questions50': '50 вопросов',
    'mode.timer': '20 сек/вопрос',
    'mode.points': 'Очки за скорость',
    'mode.streaks': 'Серии ответов',
    
    // Start screen
    'start.button': 'Начать тренировку',
    'start.categories': 'Вопросы охватывают историю, географию, науку, искусство, литературу и другие темы',
    'start.totalQuestions': 'Всего в базе:',
    'start.questionsWord': 'вопросов',
    
    // Quiz
    'quiz.question': 'Вопрос',
    'quiz.of': 'из',
    'quiz.seconds': 'сек',
    'quiz.points': 'Очки',
    'quiz.correct': 'Правильных',
    'quiz.next': 'Следующий вопрос',
    'quiz.timeUp': 'Время вышло!',
    
    // Results
    'result.title': 'Тренировка завершена!',
    'result.score': 'Ваш результат',
    'result.pointsWord': 'очков',
    'result.correct': 'Правильных ответов',
    'result.accuracy': 'Точность',
    'result.bestStreak': 'Лучшая серия',
    'result.avgTime': 'Среднее время',
    'result.secondsShort': 'сек',
    'result.excellent': 'Отлично! Вы готовы к отбору!',
    'result.good': 'Хороший результат! Продолжайте тренироваться.',
    'result.average': 'Неплохо, но есть куда расти.',
    'result.needPractice': 'Нужно больше практики.',
    'result.playAgain': 'Играть снова',
    'result.home': 'На главную',
    
    // Import
    'import.title': 'Импорт вопросов',
    'import.description': 'Загрузите JSON-файл с вопросами для добавления в базу',
    'import.dropzone': 'Перетащите JSON-файл сюда',
    'import.or': 'или нажмите для выбора файла',
    'import.format': 'Формат JSON-файла:',
    'import.questionField': 'question — текст вопроса',
    'import.optionsField': 'options — массив из 4 вариантов',
    'import.correctField': 'correctAnswer — индекс (0-3)',
    'import.categoryField': 'category — категория',
    'import.difficultyField': 'difficulty — easy/medium/hard',
    'import.download': 'Скачать шаблон JSON',
    'import.success': 'Успешно добавлено вопросов:',
    'import.error': 'Ошибка при загрузке файла',
    'import.close': 'Закрыть',
    
    // Leaderboard
    'leaderboard.title': 'Таблица рейтингов',
    'leaderboard.description': 'Лучшие результаты и история ваших игр',
    'leaderboard.player': 'Игрок',
    'leaderboard.change': 'Изменить',
    'leaderboard.top10': 'Топ-10',
    'leaderboard.history': 'Моя история',
    'leaderboard.noResults': 'Пока нет результатов',
    'leaderboard.playToRank': 'Сыграйте, чтобы попасть в рейтинг!',
    'leaderboard.rank': 'Место',
    'leaderboard.name': 'Имя',
    'leaderboard.score': 'Очки',
    'leaderboard.accuracy': 'Точность',
    'leaderboard.date': 'Дата',
    'leaderboard.mode': 'Режим',
    'leaderboard.close': 'Закрыть',
    
    // Categories
    'category.history': 'История',
    'category.geography': 'География',
    'category.science': 'Наука',
    'category.art': 'Искусство',
    'category.literature': 'Литература',
    'category.music': 'Музыка',
    'category.cinema': 'Кино',
    'category.sport': 'Спорт',
    
    // Language
    'language.ru': 'Русский',
    'language.az': 'Azərbaycan',
  },
  az: {
    // Header
    'app.title': 'Trenajor',
    'app.subtitle': '«Kim milyonçu olmaq istəyir?»',
    'app.description': 'Televiziya şousuna seçimə hazırlaşın! Taymerlə ümumi erudisiya sualları.',
    
    // Navigation
    'nav.import': 'Sualları idxal et',
    'nav.leaderboard': 'Reytinq',
    
    // Game modes
    'mode.select': 'Rejimi seçin:',
    'mode.questions25': '25 sual',
    'mode.questions50': '50 sual',
    'mode.timer': '20 san/sual',
    'mode.points': 'Sürətə görə xal',
    'mode.streaks': 'Cavab seriyaları',
    
    // Start screen
    'start.button': 'Məşqə başla',
    'start.categories': 'Suallar tarix, coğrafiya, elm, incəsənət, ədəbiyyat və digər mövzuları əhatə edir',
    'start.totalQuestions': 'Bazada cəmi:',
    'start.questionsWord': 'sual',
    
    // Quiz
    'quiz.question': 'Sual',
    'quiz.of': '/',
    'quiz.seconds': 'san',
    'quiz.points': 'Xal',
    'quiz.correct': 'Düzgün',
    'quiz.next': 'Növbəti sual',
    'quiz.timeUp': 'Vaxt bitdi!',
    
    // Results
    'result.title': 'Məşq başa çatdı!',
    'result.score': 'Nəticəniz',
    'result.pointsWord': 'xal',
    'result.correct': 'Düzgün cavablar',
    'result.accuracy': 'Dəqiqlik',
    'result.bestStreak': 'Ən yaxşı seriya',
    'result.avgTime': 'Orta vaxt',
    'result.secondsShort': 'san',
    'result.excellent': 'Əla! Seçimə hazırsınız!',
    'result.good': 'Yaxşı nəticə! Məşq etməyə davam edin.',
    'result.average': 'Pis deyil, amma inkişaf etmək lazımdır.',
    'result.needPractice': 'Daha çox məşq lazımdır.',
    'result.playAgain': 'Yenidən oyna',
    'result.home': 'Əsas səhifə',
    
    // Import
    'import.title': 'Sualları idxal et',
    'import.description': 'Bazaya əlavə etmək üçün suallarla JSON faylı yükləyin',
    'import.dropzone': 'JSON faylını bura sürükləyin',
    'import.or': 'və ya fayl seçmək üçün klikləyin',
    'import.format': 'JSON fayl formatı:',
    'import.questionField': 'question — sual mətni',
    'import.optionsField': 'options — 4 variantdan ibarət massiv',
    'import.correctField': 'correctAnswer — indeks (0-3)',
    'import.categoryField': 'category — kateqoriya',
    'import.difficultyField': 'difficulty — easy/medium/hard',
    'import.download': 'JSON şablonunu yüklə',
    'import.success': 'Uğurla əlavə edilən suallar:',
    'import.error': 'Fayl yükləmə xətası',
    'import.close': 'Bağla',
    
    // Leaderboard
    'leaderboard.title': 'Reytinq cədvəli',
    'leaderboard.description': 'Ən yaxşı nəticələr və oyun tarixçəniz',
    'leaderboard.player': 'Oyunçu',
    'leaderboard.change': 'Dəyişdir',
    'leaderboard.top10': 'Top-10',
    'leaderboard.history': 'Tarixçəm',
    'leaderboard.noResults': 'Hələ nəticə yoxdur',
    'leaderboard.playToRank': 'Reytinqə düşmək üçün oynayın!',
    'leaderboard.rank': 'Yer',
    'leaderboard.name': 'Ad',
    'leaderboard.score': 'Xal',
    'leaderboard.accuracy': 'Dəqiqlik',
    'leaderboard.date': 'Tarix',
    'leaderboard.mode': 'Rejim',
    'leaderboard.close': 'Bağla',
    
    // Categories
    'category.history': 'Tarix',
    'category.geography': 'Coğrafiya',
    'category.science': 'Elm',
    'category.art': 'İncəsənət',
    'category.literature': 'Ədəbiyyat',
    'category.music': 'Musiqi',
    'category.cinema': 'Kino',
    'category.sport': 'İdman',
    
    // Language
    'language.ru': 'Русский',
    'language.az': 'Azərbaycan',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz-language');
      return (saved as Language) || 'ru';
    }
    return 'ru';
  });

  useEffect(() => {
    localStorage.setItem('quiz-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
