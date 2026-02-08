/**
 * QuizCard Component
 * 
 * Design: Tech Luminance - светлый технологичный стиль
 * - Белые карточки с мягкими тенями
 * - Градиентные акценты cyan-to-indigo
 * - Плавные анимации и микро-взаимодействия
 * - Адаптивный дизайн для мобильных устройств (iPhone, Samsung 6-7")
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/data/questions';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Clock, Zap, Shuffle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  isAnswerRevealed: boolean;
  timeRemaining: number;
  questionTime: number;
  streak: number;
  hiddenAnswerIndexes: number[];
  secondChanceFirstWrongAnswer: number | null;
  fiftyFiftyUsed: boolean;
  swapQuestionUsed: boolean;
  secondChanceUsed: boolean;
  secondChanceArmed: boolean;
  onSelectAnswer: (index: number) => void;
  onUseFiftyFifty: () => void;
  onUseSwapQuestion: () => void;
  onUseSecondChance: () => void;
}

const answerLabels = ['A', 'B', 'C', 'D'];

export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isAnswerRevealed,
  timeRemaining,
  questionTime,
  streak,
  hiddenAnswerIndexes,
  secondChanceFirstWrongAnswer,
  fiftyFiftyUsed,
  swapQuestionUsed,
  secondChanceUsed,
  secondChanceArmed,
  onSelectAnswer,
  onUseFiftyFifty,
  onUseSwapQuestion,
  onUseSecondChance,
}: QuizCardProps) {
  const { t } = useLanguage();
  const timePercentage = (timeRemaining / questionTime) * 100;
  const isTimeWarning = timeRemaining <= 7;
  const isTimeCritical = timeRemaining <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto px-3 sm:px-0"
    >
      {/* Header with timer and progress */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 triviz-pill text-sm sm:text-base font-semibold">
            {questionNumber} / {totalQuestions}
          </span>
          <span className="px-2.5 sm:px-3.5 py-1.5 bg-white rounded-full text-xs sm:text-sm font-semibold border-2 border-[#343434] shadow-[0_4px_0_#343434] truncate max-w-[132px] sm:max-w-none">
            {question.category}
          </span>
        </div>
        
        {/* Streak indicator */}
        {streak > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#FFD34E] rounded-full border-2 border-[#343434] shadow-[0_4px_0_#343434]"
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#343434] fill-[#343434]" />
          <span className="text-xs sm:text-sm font-semibold text-[#343434]">{streak}x</span>
        </motion.div>
      )}
      </div>

      {/* Timer bar */}
      <div className="relative h-2 sm:h-2.5 bg-white rounded-full mb-4 sm:mb-6 overflow-hidden border-2 border-[#343434]">
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-colors duration-300",
            isTimeCritical ? "bg-rose-400" : isTimeWarning ? "bg-amber-400" : "bg-[#609DED]"
          )}
          initial={{ width: '100%' }}
          animate={{ width: `${timePercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer display */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className={cn(
          "flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 triviz-pill transition-all duration-300",
          isTimeCritical 
            ? "bg-rose-50 text-rose-600 timer-warning" 
            : isTimeWarning 
              ? "bg-amber-50 text-amber-600" 
              : "bg-white text-[#343434]"
        )}>
          <Clock className="w-5 h-5 sm:w-5 sm:h-5" />
          <span className="text-2xl sm:text-2xl font-bold font-display tabular-nums">
            {timeRemaining}
          </span>
          <span className="text-sm sm:text-base font-medium">{t.seconds}</span>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <p className="text-center text-xs sm:text-sm text-[#343434] mb-2">{t.lifelines}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          <button
            onClick={onUseFiftyFifty}
            disabled={fiftyFiftyUsed || isAnswerRevealed}
            className={cn(
              "px-3 py-2 rounded-xl border-2 border-[#343434] shadow-[0_4px_0_#343434] text-sm font-semibold transition-all",
              fiftyFiftyUsed || isAnswerRevealed
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-white text-[#343434] hover:scale-[1.02]"
            )}
          >
            {t.hintFiftyFifty}
          </button>
          <button
            onClick={onUseSwapQuestion}
            disabled={swapQuestionUsed || isAnswerRevealed}
            className={cn(
              "px-3 py-2 rounded-xl border-2 border-[#343434] shadow-[0_4px_0_#343434] text-sm font-semibold transition-all flex items-center justify-center gap-1.5",
              swapQuestionUsed || isAnswerRevealed
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-white text-[#343434] hover:scale-[1.02]"
            )}
          >
            <Shuffle className="w-4 h-4" />
            {t.hintSwapQuestion}
          </button>
          <motion.button
            onClick={onUseSecondChance}
            disabled={secondChanceUsed || secondChanceArmed || isAnswerRevealed}
            animate={secondChanceArmed ? { scale: [1, 1.03, 1], y: [0, -1, 0] } : { scale: 1, y: 0 }}
            transition={
              secondChanceArmed
                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            className={cn(
              "px-3 py-2 rounded-xl border-2 border-[#343434] shadow-[0_4px_0_#343434] text-sm font-semibold transition-all flex items-center justify-center gap-1.5",
              secondChanceUsed || isAnswerRevealed
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : secondChanceArmed
                  ? "bg-[#EAF2FF] text-[#343434]"
                  : "bg-white text-[#343434] hover:scale-[1.02]"
            )}
          >
            <ShieldCheck className="w-4 h-4" />
            {t.hintSecondChance}
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {secondChanceArmed && (
            <motion.p
              key="second-chance-armed"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-2 text-center text-xs sm:text-sm text-[#2F5EA8] font-semibold"
            >
              {t.hintSecondChanceArmed}
            </motion.p>
          )}
          {secondChanceUsed && !secondChanceArmed && (
            <motion.p
              key="second-chance-used"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-2 text-center text-xs sm:text-sm text-slate-500 font-semibold"
            >
              {t.hintSecondChanceUsed}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Question card */}
      <div className="triviz-panel p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#343434] text-center leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
        <AnimatePresence mode="wait">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const hasSelection = selectedAnswer !== null;
            const showCorrect = isAnswerRevealed && hasSelection && isCorrect;
            const showIncorrect = isAnswerRevealed && hasSelection && isSelected && !isCorrect;
            const isHiddenByHint = hiddenAnswerIndexes.includes(index);
            const isBlockedBySecondChance = secondChanceFirstWrongAnswer === index && !isAnswerRevealed;
            const isOptionDisabled = isAnswerRevealed || isHiddenByHint || isBlockedBySecondChance;

            return (
              <motion.button
                key={`${question.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onPointerDown={(event) => {
                  event.preventDefault();
                  if (!isOptionDisabled) {
                    onSelectAnswer(index);
                  }
                }}
                onKeyDown={(event) => {
                  if ((event.key === "Enter" || event.key === " ") && !isOptionDisabled) {
                    event.preventDefault();
                    onSelectAnswer(index);
                  }
                }}
                disabled={isOptionDisabled}
                className={cn(
                  "relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 shadow-[0_4px_0_#343434]",
                  "active:scale-[0.98]",
                  !isOptionDisabled && "sm:hover:scale-[1.02]",
                  !isAnswerRevealed && !isHiddenByHint && !isBlockedBySecondChance && "bg-white border-[#343434]",
                  isSelected && !isAnswerRevealed && "bg-[#EAF2FF] border-[#343434]",
                  showCorrect && "bg-[#C6F7BE] border-[#343434]",
                  showIncorrect && "bg-[#FFD4C8] border-[#343434]",
                  isHiddenByHint && "bg-slate-100 border-[#343434] opacity-40",
                  isBlockedBySecondChance && "bg-[#FFD4C8] border-[#343434] opacity-85",
                  isAnswerRevealed && !showCorrect && !showIncorrect && "opacity-60"
                )}
              >
                {/* Answer label */}
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-base sm:text-xl transition-colors",
                  !isAnswerRevealed && !isHiddenByHint && !isBlockedBySecondChance && "bg-white text-[#343434] border-2 border-[#343434]",
                  isSelected && !isAnswerRevealed && "bg-[#609DED] text-white border-2 border-[#343434]",
                  showCorrect && "bg-[#6AD56A] text-white border-2 border-[#343434]",
                  showIncorrect && "bg-[#F05A5A] text-white border-2 border-[#343434]",
                  isHiddenByHint && "bg-slate-200 text-slate-500 border-2 border-[#343434]",
                  isBlockedBySecondChance && "bg-[#F05A5A] text-white border-2 border-[#343434]"
                )}>
                  {showCorrect ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7" />
                  ) : showIncorrect ? (
                    <XCircle className="w-5 h-5 sm:w-7 sm:h-7" />
                  ) : isBlockedBySecondChance ? (
                    <XCircle className="w-5 h-5 sm:w-7 sm:h-7" />
                  ) : (
                    answerLabels[index]
                  )}
                </div>

                {/* Answer text */}
                <span className={cn(
                  "flex-1 font-medium text-lg sm:text-xl transition-colors leading-snug",
                  !isAnswerRevealed && "text-[#343434]",
                  showCorrect && "text-[#1D532B]",
                  showIncorrect && "text-[#7A1E1E]",
                  isHiddenByHint && "text-slate-400",
                  isBlockedBySecondChance && "text-[#7A1E1E]"
                )}>
                  {isHiddenByHint ? "..." : option}
                </span>

                {/* Correct indicator for non-selected correct answer */}
                {isAnswerRevealed && hasSelection && isCorrect && !isSelected && (
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500 flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
