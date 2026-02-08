/**
 * StartScreen Component
 * 
 * Design: Tech Luminance - светлый технологичный стиль
 * - Градиентные акценты
 * - Современная типографика
 * - Плавные анимации
 * - Адаптивный дизайн для мобильных устройств (iPhone, Samsung 6-7")
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Target, Trophy, Sparkles, Play } from 'lucide-react';
import { QuizMode } from '@/hooks/useQuiz';
import { Leaderboard } from './Leaderboard';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthButton } from './AuthButton';
import { BrandFooter } from './BrandFooter';

interface StartScreenProps {
  onStart: (mode: QuizMode) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const { t } = useLanguage();
  const selectedMode: QuizMode = '25';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:p-6 relative overflow-hidden triviz-page">
      {/* Header with actions */}
      <div className="absolute top-4 right-4 flex gap-2 z-20 items-center">
        <AuthButton className="triviz-pill" />
        <LanguageSwitcher />
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
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[24px] sm:rounded-[30px] bg-[#FFD34E] border-2 border-[#343434] shadow-[0_6px_0_#343434] flex items-center justify-center">
              <span className="text-4xl sm:text-5xl font-bold text-[#343434]">?</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 px-2 leading-tight"
        >
          <span className="text-[#343434]">{t.appTitle}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base sm:text-lg text-[#343434] mb-6 sm:mb-8 max-w-md mx-auto px-4"
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
          <p className="text-base sm:text-lg text-[#343434] mb-3 font-semibold">{t.selectMode}:</p>
          <div className="flex justify-center">
            <div className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-base sm:text-lg border-2 border-[#343434] shadow-[0_4px_0_#343434] bg-[#FFD34E] text-[#343434]">
              25 {t.questions}
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2"
        >
          {[
            { icon: Target, label: `${selectedMode} ${t.questions}`, color: 'text-cyan-600 bg-cyan-50' },
            { icon: Clock, label: `10 ${t.secPerQuestion}`, color: 'text-indigo-600 bg-indigo-50' },
            { icon: Trophy, label: t.pointsForSpeed, color: 'text-amber-600 bg-amber-50' },
            { icon: Sparkles, label: t.answerStreaks, color: 'text-emerald-600 bg-emerald-50' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              className="triviz-panel p-4 sm:p-5"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-2 sm:mb-2.5 border-2 border-[#343434]`}>
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-[#343434] leading-snug">{feature.label}</span>
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
            className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-semibold triviz-button hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 mr-2" />
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
          <p className="text-base sm:text-lg text-[#343434] px-4 leading-relaxed">
            {t.questionsInfo}
          </p>
        </motion.div>
      </motion.div>

      <BrandFooter className="mt-6" />
    </div>
  );
}
