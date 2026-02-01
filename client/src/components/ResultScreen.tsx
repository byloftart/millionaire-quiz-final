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
import { Trophy, Target, Zap, RotateCcw, CheckCircle2, XCircle, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { QuizMode } from '@/hooks/useQuiz';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { Leaderboard } from './Leaderboard';

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
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const { addResult, getRank } = useLeaderboard();
  
  // Определяем уровень результата
  const getResultLevel = () => {
    if (percentage >= 90) return { label: 'Превосходно!', emoji: '🏆', color: 'text-amber-600' };
    if (percentage >= 75) return { label: 'Отлично!', emoji: '🌟', color: 'text-emerald-600' };
    if (percentage >= 60) return { label: 'Хорошо!', emoji: '👍', color: 'text-cyan-600' };
    if (percentage >= 40) return { label: 'Неплохо', emoji: '📚', color: 'text-indigo-600' };
    return { label: 'Есть над чем работать', emoji: '💪', color: 'text-slate-600' };
  };

  const result = getResultLevel();
  const rank = getRank(score);

  // Сохранение результата в рейтинг
  useEffect(() => {
    if (!resultSaved) {
      addResult({
        score,
        correctAnswers,
        totalQuestions,
        percentage,
        maxStreak,
        mode
      });
      setResultSaved(true);
    }
  }, [score, correctAnswers, totalQuestions, percentage, maxStreak, mode, addResult, resultSaved]);

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:p-6 relative overflow-hidden" style={{
      backgroundImage: percentage >= 60 ? 'url(/images/quiz-pattern.jpg)' : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Background overlay */}
      {percentage >= 60 && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm pointer-events-none" />}
      {/* Gradient decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-cyan-100/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tl from-indigo-100/30 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Leaderboard button */}
      <div className="absolute top-4 right-4 z-20">
        <Leaderboard />
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
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft p-5 sm:p-8 text-center mb-4 sm:mb-6">
          {/* Trophy icon or illustration */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 15 }}
            className="mb-4 sm:mb-6 flex justify-center"
          >
            {percentage >= 60 ? (
              <img src="/images/success-illustration.png" alt="Success" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
            ) : (
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                <Trophy className="w-8 h-8 sm:w-12 sm:h-12 text-amber-500" />
              </div>
            )}
          </motion.div>

          {/* Result message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-3xl sm:text-4xl mb-2 block">{result.emoji}</span>
            <h2 className={`text-2xl sm:text-3xl font-display font-bold mb-1 sm:mb-2 ${result.color}`}>
              {result.label}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Тренировка завершена • {mode} вопросов
            </p>
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="my-5 sm:my-8"
          >
            <div className="text-4xl sm:text-6xl font-display font-bold gradient-text mb-1 sm:mb-2">
              {score.toLocaleString()}
            </div>
            <p className="text-slate-500 text-xs sm:text-sm">очков • место #{rank} в рейтинге</p>
          </motion.div>

          {/* Percentage circle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-5 sm:mb-8"
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-100"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 352' }}
                animate={{ strokeDasharray: `${(percentage / 100) * 352} 352` }}
                transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-slate-800">{percentage}%</span>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-2 sm:gap-4"
          >
            <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                <span className="text-xl sm:text-2xl font-bold text-emerald-700">{correctAnswers}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-600">Правильных</p>
            </div>
            <div className="bg-rose-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span className="text-xl sm:text-2xl font-bold text-rose-700">{incorrectAnswers}</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-600">Неправильных</p>
            </div>
            <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <span className="text-xl sm:text-2xl font-bold text-amber-700">{maxStreak}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-600">Макс. серия</p>
            </div>
            <div className="bg-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                <span className="text-xl sm:text-2xl font-bold text-indigo-700">{totalQuestions}</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-600">Всего вопросов</p>
            </div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Button
            onClick={onRestart}
            size="lg"
            className="flex-1 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl gradient-bg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Ещё раз
          </Button>
          <Button
            onClick={onHome}
            size="lg"
            variant="outline"
            className="flex-1 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl border-2 hover:bg-slate-50"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            На главную
          </Button>
        </motion.div>

        {/* Motivation text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-slate-500 px-4"
        >
          {percentage >= 80 
            ? 'Отличная подготовка! Ты готов к отбору!' 
            : percentage >= 60 
              ? 'Хороший результат! Продолжай тренироваться!' 
              : 'Практика — путь к совершенству. Попробуй ещё раз!'}
        </motion.p>
      </motion.div>
    </div>
  );
}
