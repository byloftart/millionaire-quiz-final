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
import { StartScreen } from '@/components/StartScreen';
import { QuizCard } from '@/components/QuizCard';
import { ResultScreen } from '@/components/ResultScreen';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Brain, Home as HomeIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrandFooter } from '@/components/BrandFooter';

export default function Home() {
  const { language, t } = useLanguage();
  const { customQuestions } = useCustomQuestions(language);
  
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
    fiftyFiftyUsed,
    swapQuestionUsed,
    secondChanceUsed,
    secondChanceArmed,
    secondChanceFirstWrongAnswer,
    hiddenAnswerIndexes,
    progress,
    mode,
    startQuiz,
    selectAnswer,
    nextQuestion,
    restartQuiz,
    useFiftyFifty,
    useSwapQuestion,
    useSecondChance,
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
      <StartScreen onStart={handleStart} />
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
    <div className="min-h-screen flex flex-col relative triviz-page">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FFF8EE] border-b-0">
        <div className="container py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FFD34E] border-2 border-[#343434] shadow-[0_4px_0_#343434] flex items-center justify-center">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#343434]" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-[#343434] leading-tight text-sm sm:text-base">
                  {t.appShortTitle}
                </h1>
                <p className="text-xs sm:text-sm text-[#343434]">{t.appTitle}</p>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                onClick={handleHome}
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex gap-2 triviz-pill"
              >
                <HomeIcon className="w-4 h-4" />
                {t.backToMenu}
              </Button>
              <div className="text-right triviz-pill px-3 sm:px-4 py-2">
                <p className="text-xs sm:text-sm text-[#343434]">{t.score}</p>
                <p className="text-lg sm:text-xl font-bold text-[#343434] leading-tight">{score.toLocaleString()}</p>
              </div>
              <div className="text-right triviz-pill px-3 sm:px-4 py-2">
                <p className="text-xs sm:text-sm text-[#343434]">{t.correctAnswers}</p>
                <p className="text-lg sm:text-xl font-bold text-[#343434] leading-tight">{correctAnswers}/{currentQuestionIndex + (isAnswerRevealed ? 1 : 0)}</p>
              </div>
            </div>
          </div>
          <div className="sm:hidden mt-2">
            <Button
              onClick={handleHome}
              variant="outline"
              size="sm"
              className="w-full gap-2 triviz-pill"
            >
              <HomeIcon className="w-4 h-4" />
              {t.backToMenu}
            </Button>
          </div>

          {/* Progress bar */}
          <div className="mt-2 sm:mt-3">
            <Progress value={progress} className="h-2 sm:h-2.5 border-2 border-[#343434] bg-white" />
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
              hiddenAnswerIndexes={hiddenAnswerIndexes}
              secondChanceFirstWrongAnswer={secondChanceFirstWrongAnswer}
              fiftyFiftyUsed={fiftyFiftyUsed}
              swapQuestionUsed={swapQuestionUsed}
              secondChanceUsed={secondChanceUsed}
              secondChanceArmed={secondChanceArmed}
              onSelectAnswer={selectAnswer}
              onUseFiftyFifty={useFiftyFifty}
              onUseSwapQuestion={useSwapQuestion}
              onUseSecondChance={useSecondChance}
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
                className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold bg-transparent text-[#609DED] hover:text-[#4B86D6] transition-all duration-200 underline underline-offset-8"
              >
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <>
                    {t.nextQuestion}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </>
                ) : (
                  t.showResults
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer hint */}
      <BrandFooter hint={t.footerHint} className="py-4 sm:py-5" />
    </div>
  );
}
