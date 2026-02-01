import { useState, useCallback, useEffect, useRef } from 'react';
import { Question, questions as baseQuestions } from '@/data/questions';
import { questionsAz } from '@/data/questions-az';

// Type assertion for questionsAz to ensure it matches Question[] interface
declare const questionsAzTyped: Question[];

const AUTO_NEXT_DELAY = 1500; // Мс до автоматического перехода

export type QuizMode = '25' | '50';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  isAnswerRevealed: boolean;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeRemaining: number;
  isQuizStarted: boolean;
  isQuizFinished: boolean;
  streak: number;
  maxStreak: number;
  mode: QuizMode;
}

const QUESTION_TIME = 20; // секунд на вопрос (изменено с 30 на 20)

export function useQuiz(customQuestions: Question[] = [], language: 'ru' | 'az' = 'ru') {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswerRevealed: false,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeRemaining: QUESTION_TIME,
    isQuizStarted: false,
    isQuizFinished: false,
    streak: 0,
    maxStreak: 0,
    mode: '50',
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Объединённая база вопросов (базовые + пользовательские)
  const getAllQuestions = useCallback((): Question[] => {
    const baseQs = language === 'az' ? (questionsAz as any as Question[]) : baseQuestions;
    return [...baseQs, ...customQuestions];
  }, [customQuestions, language]);

  // Получение сбалансированного набора вопросов с учётом пользовательских
  const getQuestions = useCallback((count: number): Question[] => {
    const allQuestions = getAllQuestions();
    
    // Разделяем по сложности
    const easy = allQuestions.filter(q => q.difficulty === 'easy').sort(() => Math.random() - 0.5);
    const medium = allQuestions.filter(q => q.difficulty === 'medium').sort(() => Math.random() - 0.5);
    const hard = allQuestions.filter(q => q.difficulty === 'hard').sort(() => Math.random() - 0.5);
    
    // Распределение: 34% лёгкие, 33% средние, 33% сложные
    const easyCount = Math.ceil(count * 0.34);
    const mediumCount = Math.ceil(count * 0.33);
    const hardCount = count - easyCount - mediumCount;
    
    const selected = [
      ...easy.slice(0, easyCount),
      ...medium.slice(0, mediumCount),
      ...hard.slice(0, hardCount)
    ];
    
    // Если не хватает вопросов, добираем из общего пула
    if (selected.length < count) {
      const remaining = allQuestions
        .filter(q => !selected.includes(q))
        .sort(() => Math.random() - 0.5)
        .slice(0, count - selected.length);
      selected.push(...remaining);
    }
    
    // Перемешиваем финальный набор
    return selected.sort(() => Math.random() - 0.5);
  }, [getAllQuestions]);

  // Запуск таймера
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          // Время вышло - показываем правильный ответ
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return {
            ...prev,
            timeRemaining: 0,
            isAnswerRevealed: true,
            incorrectAnswers: prev.incorrectAnswers + 1,
            streak: 0,
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
  }, []);

  // Остановка таймера
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Автоматический переход к следующему вопросу
  const autoNextQuestion = useCallback(() => {
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      setState(prev => ({ ...prev, isQuizFinished: true }));
      return;
    }
    
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswer: null,
      isAnswerRevealed: false,
      timeRemaining: QUESTION_TIME,
    }));
  }, [state.currentQuestionIndex, state.questions.length]);

  // Начало викторины с выбранным режимом
  const startQuiz = useCallback((mode: QuizMode = '50') => {
    const questionCount = mode === '25' ? 25 : 50;
    const questions = getQuestions(questionCount);
    
    setState({
      questions,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswerRevealed: false,
      score: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      timeRemaining: QUESTION_TIME,
      isQuizStarted: true,
      isQuizFinished: false,
      streak: 0,
      maxStreak: 0,
      mode,
    });
  }, [getQuestions]);

  // Запуск таймера при начале викторины или переходе к следующему вопросу
  useEffect(() => {
    if (state.isQuizStarted && !state.isQuizFinished && !state.isAnswerRevealed) {
      startTimer();
    }
    return () => stopTimer();
  }, [state.isQuizStarted, state.isQuizFinished, state.currentQuestionIndex, state.isAnswerRevealed, startTimer, stopTimer]);

  // Выбор ответа
  const selectAnswer = useCallback((answerIndex: number) => {
    if (state.isAnswerRevealed || state.selectedAnswer !== null) return;
    
    stopTimer();
    
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswerRevealed: true,
      score: isCorrect ? prev.score + calculatePoints(prev.timeRemaining) : prev.score,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      incorrectAnswers: isCorrect ? prev.incorrectAnswers : prev.incorrectAnswers + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
      maxStreak: isCorrect ? Math.max(prev.maxStreak, prev.streak + 1) : prev.maxStreak,
    }));
  }, [state.isAnswerRevealed, state.selectedAnswer, state.questions, state.currentQuestionIndex, stopTimer]);

  // Переход к следующему вопросу (ручной)
  const nextQuestion = useCallback(() => {
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      setState(prev => ({ ...prev, isQuizFinished: true }));
      return;
    }
    
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswer: null,
      isAnswerRevealed: false,
      timeRemaining: QUESTION_TIME,
    }));
  }, [state.currentQuestionIndex, state.questions.length]);

  // Перезапуск викторины
  const restartQuiz = useCallback(() => {
    stopTimer();
    setState(prev => ({ ...prev, isQuizStarted: false, isQuizFinished: false }));
  }, [stopTimer]);

  // Автоматический переход к следующему вопросу через 1.5 секунд
  useEffect(() => {
    if (state.isAnswerRevealed && !state.isQuizFinished) {
      const autoNextTimer = setTimeout(() => {
        autoNextQuestion();
      }, 1500); // 1.5 секунд для отображения результата
      return () => clearTimeout(autoNextTimer);
    }
  }, [state.isAnswerRevealed, state.isQuizFinished, autoNextQuestion]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const currentQuestion = state.questions[state.currentQuestionIndex] || null;
  const progress = state.questions.length > 0 
    ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100 
    : 0;
  const totalQuestions = state.mode === '25' ? 25 : 50;

  return {
    ...state,
    currentQuestion,
    progress,
    totalQuestions,
    questionTime: QUESTION_TIME,
    totalAvailableQuestions: getAllQuestions().length,
    startQuiz,
    selectAnswer,
    nextQuestion,
    autoNextQuestion,
    restartQuiz,
  };
}

// Расчёт очков с бонусом за скорость (адаптировано для 20 сек)
function calculatePoints(timeRemaining: number): number {
  const basePoints = 100;
  const timeBonus = Math.floor(timeRemaining * 5); // до 100 бонусных очков за 20 сек
  return basePoints + timeBonus;
}
