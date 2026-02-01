/**
 * StartScreen Component
 * 
 * Design: Tech Luminance - светлый технологичный стиль
 * - Градиентные акценты
 * - Современная типографика
 * - Плавные анимации
 * - Адаптивный дизайн для мобильных устройств (iPhone, Samsung 6-7")
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Clock, Target, Trophy, Sparkles, Play } from 'lucide-react';
import { QuizMode } from '@/hooks/useQuiz';
import { ImportQuestions } from './ImportQuestions';
import { Leaderboard } from './Leaderboard';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface StartScreenProps {
  onStart: (mode: QuizMode) => void;
  totalQuestions: number;
  customQuestionsCount: number;
  language?: string;
}

export function StartScreen({ onStart, totalQuestions, customQuestionsCount }: StartScreenProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedMode, setSelectedMode] = useState<QuizMode>('50');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:p-6 relative overflow-hidden" style={{
      backgroundImage: 'url(/images/hero-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm pointer-events-none" />
      {/* Gradient decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-cyan-100/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tl from-indigo-100/30 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header with actions */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <LanguageSwitcher />
        <ImportQuestions />
        <Leaderboard />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 sm:mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl gradient-bg flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 border-2 border-dashed border-indigo-200 rounded-[1.5rem] sm:rounded-[2rem]"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 px-2"
        >
          <span className="gradient-text">{t.appTitle.split('?')[0]}</span>
          <br />
          <span className="gradient-text text-xl sm:text-3xl md:text-4xl">{t.appTitle}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto px-4"
        >
          {t.appSubtitle}
        </motion.p>

        {/* Mode selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <p className="text-sm text-slate-500 mb-3">{t.selectMode}:</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setSelectedMode('25')}
              className={`
                px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200
                ${selectedMode === '25' 
                  ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-indigo-300'
                }
              `}
            >
              25 {t.questions}
            </button>
            <button
              onClick={() => setSelectedMode('50')}
              className={`
                px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200
                ${selectedMode === '50' 
                  ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-indigo-300'
                }
              `}
            >
              50 {t.questions}
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8 px-2"
        >
          {[
            { icon: Target, label: `${selectedMode} ${t.questions}`, color: 'text-cyan-600 bg-cyan-50' },
            { icon: Clock, label: `20 ${t.secPerQuestion}`, color: 'text-indigo-600 bg-indigo-50' },
            { icon: Trophy, label: t.pointsForSpeed, color: 'text-amber-600 bg-amber-50' },
            { icon: Sparkles, label: t.answerStreaks, color: 'text-emerald-600 bg-emerald-50' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-soft"
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-1.5 sm:mb-2`}>
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-700">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Button
            onClick={() => onStart(selectedMode)}
            size="lg"
            className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl gradient-bg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Play className="w-5 h-5 mr-2" />
            {t.startTraining}
          </Button>
        </motion.div>

        {/* Info text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 sm:mt-8 space-y-2"
        >
          <p className="text-xs sm:text-sm text-slate-500 px-4">
            {t.questionsInfo}
          </p>
          <p className="text-xs text-slate-400">
            {t.totalInDatabase}: {totalQuestions} {t.questions}
            {customQuestionsCount > 0 && (
              <span className="text-indigo-500"> (+{customQuestionsCount} {t.custom})</span>
            )}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
