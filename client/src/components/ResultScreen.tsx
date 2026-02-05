/**
 * ResultScreen Component
 * 
 * Design: Tech Luminance - светлый технологичный стиль
 * - Праздничные анимации при хорошем результате
 * - Детальная статистика
 * - Мотивирующие сообщения
 * - Адаптивный дизайн для мобильных устройств (iPhone, Samsung 6-7")
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Zap, RotateCcw, CheckCircle2, XCircle, Home, X, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { QuizMode } from '@/hooks/useQuiz';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { Leaderboard } from './Leaderboard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { AuthButton } from './AuthButton';

interface ResultScreenProps {
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  maxStreak: number;
  mode: QuizMode;
  onRestart: () => void;
  onHome: () => void;
}

export function ResultScreen({
  score,
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
  maxStreak,
  mode,
  onRestart,
  onHome,
}: ResultScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const { t } = useLanguage();
  const { status } = useAuth();
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const { saveResult, getRank } = useLeaderboard();
  
  // Определяем уровень результата
  const getResultLevel = () => {
    if (percentage >= 90) return { label: t.resultExcellent, emoji: '🏆', color: 'text-amber-600' };
    if (percentage >= 75) return { label: t.resultGreat, emoji: '🌟', color: 'text-emerald-600' };
    if (percentage >= 60) return { label: t.resultGood, emoji: '👍', color: 'text-cyan-600' };
    if (percentage >= 40) return { label: t.resultOk, emoji: '📚', color: 'text-indigo-600' };
    return { label: t.resultTryAgain, emoji: '💪', color: 'text-slate-600' };
  };

  const result = getResultLevel();
  // Сохранение результата в рейтинг
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!resultSaved) {
      saveResult({
        score,
        correctAnswers,
        totalQuestions,
        percentage,
        maxStreak,
        mode,
      }).then((result) => {
        if (result?.saved) {
          setSaveMessage(result.isGuest ? t.resultSavedLocal : t.resultSavedOnline);
          if (typeof result.rank === 'number') {
            setRank(result.rank);
          } else {
            setRank(getRank(score));
          }
        } else if (status === "guest") {
          setSaveMessage(t.resultLoginToSave);
        }
        setResultSaved(true);
      });
    }
  }, [score, correctAnswers, totalQuestions, percentage, maxStreak, mode, saveResult, resultSaved, t, status, getRank]);

  useEffect(() => {
    if (percentage >= 60) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [percentage]);

  // Confetti particles
  const confettiColors = ['#06B6D4', '#6366F1', '#10B981', '#F59E0B', '#EC4899'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:p-6 relative overflow-hidden triviz-page">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-12 h-40 w-40 rounded-full bg-[#FFE9C2]" />
        <div className="absolute bottom-20 right-10 h-24 w-24 rounded-full bg-[#FFE9C2]" />
      </div>

      {/* Leaderboard button */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <AuthButton className="triviz-pill" />
        <Leaderboard className="triviz-pill" />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                rotate: Math.random() * 720 - 360,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: 'linear',
                delay: Math.random() * 0.5,
              }}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-sm"
              style={{
                backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 max-w-lg w-full"
      >
        {/* Result card */}
        <div className="triviz-panel p-5 sm:p-8 text-center mb-4 sm:mb-6 relative">
          <button
            onClick={onHome}
            className="absolute right-4 top-4 text-[#343434] hover:opacity-70"
            aria-label={t.backToMenu}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#343434]">Quiz Summary</h2>
          </motion.div>

          {/* Medal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 160 }}
            className="my-6 sm:my-8"
          >
            <div className="mx-auto h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-[#343434] bg-[#FFD34E] shadow-[0_4px_0_#343434] flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-[#343434] text-[#FFD34E] flex items-center justify-center font-bold text-xl">
                ×
              </div>
            </div>
          </motion.div>

          {/* Result message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#343434] mb-1">
              {result.label}
            </h3>
            <p className="text-sm sm:text-base text-[#343434]">
              {t.trainingComplete} • {mode} {t.questions}
            </p>
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="my-4 sm:my-6"
          >
            {status === "authenticated" && rank ? (
              <p className="text-[#343434] text-sm sm:text-base font-semibold">
                {t.rank} #{rank}
              </p>
            ) : (
              <p className="text-[#343434] text-xs sm:text-sm">
                {saveMessage || t.resultLoginToSave}
              </p>
            )}
          </motion.div>

          {/* Percentage circle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="my-4 sm:my-6"
          >
            <p className="text-[#343434] text-sm sm:text-base">
              {t.totalScore}: <span className="font-bold">{score.toLocaleString()}</span>
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="triviz-outline p-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#343434]" />
                <span className="text-xl sm:text-2xl font-bold text-[#343434]">{correctAnswers}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#343434]">{t.correctAnswers}</p>
            </div>
            <div className="triviz-outline p-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#343434]" />
                <span className="text-xl sm:text-2xl font-bold text-[#343434]">{incorrectAnswers}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#343434]">{t.incorrectAnswers}</p>
            </div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-3"
        >
          <Button
            onClick={onRestart}
            size="lg"
            className="flex-1 py-4 sm:py-6 text-base sm:text-lg font-semibold triviz-button"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {t.playAgain}
          </Button>
          <Button
            onClick={onHome}
            size="lg"
            variant="outline"
            className="w-14 sm:w-16 py-4 sm:py-6 border-2 border-[#343434] shadow-[0_4px_0_#343434]"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Motivation text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-[#343434] px-4"
        >
          {percentage >= 80 
            ? t.resultMotivationHigh 
            : percentage >= 60 
              ? t.resultMotivationMid 
              : t.resultMotivationLow}
        </motion.p>
      </motion.div>
    </div>
  );
}
