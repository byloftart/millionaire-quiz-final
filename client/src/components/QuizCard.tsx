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
import { CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
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
  onSelectAnswer: (index: number) => void;
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
  onSelectAnswer,
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
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 triviz-pill text-xs sm:text-sm font-semibold">
            {questionNumber} / {totalQuestions}
          </span>
          <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white rounded-full text-[10px] sm:text-xs font-semibold border-2 border-[#343434] shadow-[0_4px_0_#343434] truncate max-w-[100px] sm:max-w-none">
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
          "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 triviz-pill transition-all duration-300",
          isTimeCritical 
            ? "bg-rose-50 text-rose-600 timer-warning" 
            : isTimeWarning 
              ? "bg-amber-50 text-amber-600" 
              : "bg-white text-[#343434]"
        )}>
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xl sm:text-2xl font-bold font-display tabular-nums">
            {timeRemaining}
          </span>
          <span className="text-xs sm:text-sm font-medium">{t.seconds}</span>
        </div>
      </div>

      {/* Question card */}
      <div className="triviz-panel p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-[#343434] text-center leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2 md:gap-4">
        <AnimatePresence mode="wait">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const hasSelection = selectedAnswer !== null;
            const showCorrect = isAnswerRevealed && hasSelection && isCorrect;
            const showIncorrect = isAnswerRevealed && hasSelection && isSelected && !isCorrect;

            return (
              <motion.button
                key={`${question.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => !isAnswerRevealed && onSelectAnswer(index)}
                disabled={isAnswerRevealed}
                className={cn(
                  "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 shadow-[0_4px_0_#343434]",
                  "active:scale-[0.98]",
                  "sm:hover:scale-[1.02]",
                  !isAnswerRevealed && "bg-white border-[#343434]",
                  isSelected && !isAnswerRevealed && "bg-[#EAF2FF] border-[#343434]",
                  showCorrect && "bg-[#C6F7BE] border-[#343434]",
                  showIncorrect && "bg-[#FFD4C8] border-[#343434]",
                  isAnswerRevealed && !showCorrect && !showIncorrect && "opacity-60"
                )}
              >
                {/* Answer label */}
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-lg transition-colors",
                  !isAnswerRevealed && "bg-white text-[#343434] border-2 border-[#343434]",
                  isSelected && !isAnswerRevealed && "bg-[#609DED] text-white border-2 border-[#343434]",
                  showCorrect && "bg-[#6AD56A] text-white border-2 border-[#343434]",
                  showIncorrect && "bg-[#F05A5A] text-white border-2 border-[#343434]"
                )}>
                  {showCorrect ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
                  ) : showIncorrect ? (
                    <XCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                  ) : (
                    answerLabels[index]
                  )}
                </div>

                {/* Answer text */}
                <span className={cn(
                  "flex-1 font-medium text-sm sm:text-base transition-colors leading-snug",
                  !isAnswerRevealed && "text-[#343434]",
                  showCorrect && "text-[#1D532B]",
                  showIncorrect && "text-[#7A1E1E]"
                )}>
                  {option}
                </span>

                {/* Correct indicator for non-selected correct answer */}
                {isAnswerRevealed && hasSelection && isCorrect && !isSelected && (
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
