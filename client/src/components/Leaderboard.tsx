/**
 * Leaderboard Component
 * 
 * Таблица рейтингов с историей результатов игр
 * Адаптивный дизайн для мобильных устройств
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Clock, Target, Flame, User, Trash2 } from 'lucide-react';
import { useLeaderboard, GameResult } from '@/hooks/useLeaderboard';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardProps {
  className?: string;
}

export function Leaderboard({ className }: LeaderboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { leaderboard, playerName, getTopResults, getPlayerHistory, clearGuestHistory, updatePlayerName } = useLeaderboard();
  const { user, status } = useAuth();
  const { t } = useLanguage();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(playerName || '');

  useEffect(() => {
    setNameInput(playerName || '');
  }, [playerName]);

  const topResults = getTopResults(10);
  const playerHistory = getPlayerHistory();

  const handleSaveName = () => {
    updatePlayerName(nameInput);
    setEditingName(false);
    toast.success(t.leaderboardNameSaved);
  };

  const handleClearLeaderboard = () => {
    if (confirm(t.leaderboardClearConfirm)) {
      clearGuestHistory();
      toast.success(t.leaderboardCleared);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-slate-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-700" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-slate-500">{index + 1}</span>;
    }
  };

  const ResultRow = ({ result, index, showRank = true }: { result: GameResult; index: number; showRank?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg
        ${index === 0 && showRank ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200' : 'bg-slate-50'}
      `}
    >
      {showRank && (
        <div className="flex-shrink-0 w-6 sm:w-8">
          {getRankIcon(index)}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-800 truncate text-sm sm:text-base">
            {result.playerName}
          </span>
            <span className="text-xs px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded">
              {result.mode}Q
            </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500 mt-0.5">
          <span className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            {result.percentage}%
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {result.maxStreak}
          </span>
          <span className="hidden sm:inline">{result.date}</span>
        </div>
      </div>
      
      <div className="text-right flex-shrink-0">
        <div className="font-bold text-indigo-600 text-sm sm:text-base">{result.score.toLocaleString()}</div>
        <div className="text-xs text-slate-500">
          {result.correctAnswers}/{result.totalQuestions}
        </div>
      </div>
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 text-sm ${className}`}
        >
          <Trophy className="w-4 h-4" />
          <span className="hidden sm:inline">{t.leaderboard}</span>
          {leaderboard.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
              {leaderboard.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg max-w-[95vw] max-h-[85vh] overflow-hidden flex flex-col mx-auto">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Trophy className="w-5 h-5 text-amber-500" />
            {t.leaderboardTitle}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {t.leaderboardDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Player name */}
        <div className="flex items-center gap-2 p-2 sm:p-3 bg-slate-50 rounded-lg flex-shrink-0">
          <User className="w-4 h-4 text-slate-500 flex-shrink-0" />
          {status === "authenticated" ? (
            <>
              <span className="flex-1 text-sm font-medium truncate">
                {user?.name || t.authGuest}
              </span>
            </>
          ) : editingName ? (
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={t.leaderboardNamePlaceholder}
                maxLength={20}
                autoFocus
              />
              <Button size="sm" onClick={handleSaveName}>
                {t.leaderboardSaveName}
              </Button>
            </div>
          ) : (
            <>
              <span className="flex-1 text-sm font-medium truncate">{playerName || t.authGuest}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setNameInput(playerName);
                  setEditingName(true);
                }}
                className="text-xs"
              >
                {t.leaderboardChangeName}
              </Button>
            </>
          )}
        </div>

        <Tabs defaultValue="top" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
            <TabsTrigger value="top" className="text-sm">{t.leaderboardTop}</TabsTrigger>
            <TabsTrigger value="history" className="text-sm">{t.leaderboardHistory}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="top" className="flex-1 overflow-auto mt-2">
            {topResults.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">{t.noResults}</p>
                <p className="text-xs mt-1">{t.leaderboardPlayToRank}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {topResults.map((result, index) => (
                  <ResultRow key={result.id} result={result} index={index} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="flex-1 overflow-auto mt-2">
            {playerHistory.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">{t.leaderboardHistoryEmpty}</p>
                <p className="text-xs mt-1">{t.leaderboardHistoryHint}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {playerHistory.map((result, index) => (
                  <ResultRow key={result.id} result={result} index={index} showRank={false} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {status !== "authenticated" && playerHistory.length > 0 && (
          <div className="pt-3 border-t flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearLeaderboard}
              className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t.clearHistory}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
