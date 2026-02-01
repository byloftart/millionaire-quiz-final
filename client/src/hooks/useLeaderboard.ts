import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface GameResult {
  id: string;
  playerName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  maxStreak: number;
  mode: '25' | '50';
  date: string;
  timestamp: number;
}

const MAX_LEADERBOARD_ENTRIES = 50;

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useLocalStorage<GameResult[]>('quiz_leaderboard', []);
  const [playerName, setPlayerName] = useLocalStorage<string>('player_name', '');

  // Добавление результата в таблицу рейтингов
  const addResult = useCallback((result: Omit<GameResult, 'id' | 'date' | 'timestamp' | 'playerName'>) => {
    const newResult: GameResult = {
      ...result,
      id: crypto.randomUUID(),
      playerName: playerName || 'Игрок',
      date: new Date().toLocaleDateString('ru-RU'),
      timestamp: Date.now()
    };

    setLeaderboard(prev => {
      const updated = [newResult, ...prev]
        .sort((a, b) => b.score - a.score) // Сортировка по очкам (убывание)
        .slice(0, MAX_LEADERBOARD_ENTRIES); // Ограничение количества записей
      return updated;
    });

    return newResult;
  }, [playerName, setLeaderboard]);

  // Получение топ-N результатов
  const getTopResults = useCallback((count: number = 10): GameResult[] => {
    return leaderboard.slice(0, count);
  }, [leaderboard]);

  // Получение истории игр текущего игрока
  const getPlayerHistory = useCallback((): GameResult[] => {
    if (!playerName) return [];
    return leaderboard.filter(r => r.playerName === playerName);
  }, [leaderboard, playerName]);

  // Очистка таблицы рейтингов
  const clearLeaderboard = useCallback(() => {
    setLeaderboard([]);
  }, [setLeaderboard]);

  // Получение позиции в рейтинге
  const getRank = useCallback((score: number): number => {
    const position = leaderboard.findIndex(r => r.score < score);
    return position === -1 ? leaderboard.length + 1 : position + 1;
  }, [leaderboard]);

  // Обновление имени игрока
  const updatePlayerName = useCallback((name: string) => {
    setPlayerName(name.trim() || 'Игрок');
  }, [setPlayerName]);

  return {
    leaderboard,
    playerName,
    addResult,
    getTopResults,
    getPlayerHistory,
    clearLeaderboard,
    getRank,
    updatePlayerName
  };
}
