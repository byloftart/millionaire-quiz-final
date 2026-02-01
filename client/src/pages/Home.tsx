/**
 * Home Page - Тренажёр «Кто хочет стать миллионером?»
 * 
 * Design: Tech Luminance - светлый технологичный стиль
 * - Чистый белый фон с градиентными акцентами
 * - Современная типографика (Outfit + Inter)
 * - Плавные анимации и микро-взаимодействия
 * - Адаптивный дизайн для мобильных устройств (iPhone, Samsung 6-7")
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useQuiz, QuizMode } from '@/hooks/useQuiz';
import { useCustomQuestions } from '@/hooks/useCustomQuestions';
import { useLanguage } from '@/contexts/LanguageContext';
import { StartScreen } from '@/components/StartScreen';
import { QuizCard } from '@/components/QuizCard';
import { ResultScreen } from '@/components/ResultScreen';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Brain } from 'lucide-react';

export default function Home() {
  const { customQuestions, customQuestionsCount } = useCustomQuestions();
  const { language } = useLanguage();
  
  const {
    isQuizStarted,
    isQuizFinished,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    isAnswerRevealed,
    timeRemaining,
    questionTime,
    score,
    correctAnswers,
    incorrectAnswers,
    streak,
    maxStreak,
    progress,
    mode,
    totalAvailableQuestions,
    startQuiz,
    selectAnswer,
    nextQuestion,
    restartQuiz,
  } = useQuiz(customQuestions, language);

  const handleStart = (selectedMode: QuizMode) => {
    startQuiz(selectedMode);
  };

  const handleHome = () => {
    restartQuiz();
  };

  const handleRestart = () => {
    startQuiz(mode);
  };

  // Start screen
  if (!isQuizStarted && !isQuizFinished) {
    return (
      <StartScreen 
        onStart={handleStart}
        totalQuestions={totalAvailableQuestions}
        customQuestionsCount={customQuestionsCount}
      />
    );
  }

  // Result screen
  if (isQuizFinished) {
    return (
      <ResultScreen
        score={score}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        totalQuestions={totalQuestions}
        maxStreak={maxStreak}
        mode={mode}
        onRestart={handleRestart}
        onHome={handleHome}
      />
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-cyan-100/40 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tl from-indigo-100/40 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-r from-cyan-50/30 to-indigo-50/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="container py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl gradient-bg flex items-center justify-center">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-slate-800 leading-tight text-sm sm:text-base">
                  {language === 'az' ? 'Trenajor' : 'Тренажёр'}
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500">{language === 'az' ? '«Kim milyonçu olmaq istəyir?»' : 'Кто хочет стать миллионером?'}</p>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-slate-500">{language === 'az' ? 'Xal' : 'Очки'}</p>
                <p className="text-base sm:text-lg font-bold gradient-text">{score.toLocaleString()}</p>
              </div>
              <div className="h-8 sm:h-10 w-px bg-slate-200" />
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-slate-500">{language === 'az' ? 'Düzgün' : 'Правильных'}</p>
                <p className="text-base sm:text-lg font-bold text-emerald-600">{correctAnswers}/{currentQuestionIndex + (isAnswerRevealed ? 1 : 0)}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2 sm:mt-3">
            <Progress value={progress} className="h-1.5 sm:h-2" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-4 sm:py-8 relative z-10">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <QuizCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={selectedAnswer}
              isAnswerRevealed={isAnswerRevealed}
              timeRemaining={timeRemaining}
              questionTime={questionTime}
              streak={streak}
              onSelectAnswer={selectAnswer}
            />
          )}
        </AnimatePresence>

        {/* Next button */}
        <AnimatePresence>
          {isAnswerRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex justify-center mt-6 sm:mt-8 px-3"
            >
              <Button
                onClick={nextQuestion}
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl gradient-bg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl sm:hover:scale-105 active:scale-95"
              >
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <>
                    {language === 'az' ? 'Növbəti sual' : 'Следующий вопрос'}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </>
                ) : (
                  language === 'az' ? 'Nəticələri göstər' : 'Показать результаты'
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer hint */}
      <footer className="py-3 sm:py-4 text-center text-xs sm:text-sm text-slate-400 relative z-10">
        <p>{language === 'az' ? 'Vaxt bitməmiş düzgün cavabı seçin' : 'Выбери правильный ответ до истечения времени'}</p>
      </footer>
    </div>
  );
}
