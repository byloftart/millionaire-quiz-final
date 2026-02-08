import { useState, useCallback, useEffect, useRef } from "react";
import type { Question } from "@/data/questions";
import { getBaseQuestions } from "@/data/questions-loader";
import type { Language } from "@/data/translations";

export type QuizMode = "25" | "50";

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
  fiftyFiftyUsed: boolean;
  swapQuestionUsed: boolean;
  secondChanceUsed: boolean;
  secondChanceArmed: boolean;
  secondChanceFirstWrongAnswer: number | null;
  hiddenAnswerIndexes: number[];
}

const QUESTION_TIME = 10;

export function useQuiz(customQuestions: Question[] = [], language: Language = "ru") {
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
    mode: "25",
    fiftyFiftyUsed: false,
    swapQuestionUsed: false,
    secondChanceUsed: false,
    secondChanceArmed: false,
    secondChanceFirstWrongAnswer: null,
    hiddenAnswerIndexes: [],
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextRef = useRef<NodeJS.Timeout | null>(null);
  const selectionLockRef = useRef(false);

  const getAllQuestions = useCallback((): Question[] => {
    return [...getBaseQuestions(language), ...customQuestions];
  }, [customQuestions, language]);

  const getQuestions = useCallback(
    (count: number): Question[] => {
      const allQuestions = getAllQuestions();

      const easy = allQuestions
        .filter((question) => question.difficulty === "easy")
        .sort(() => Math.random() - 0.5);
      const medium = allQuestions
        .filter((question) => question.difficulty === "medium")
        .sort(() => Math.random() - 0.5);
      const hard = allQuestions
        .filter((question) => question.difficulty === "hard")
        .sort(() => Math.random() - 0.5);

      const easyCount = Math.ceil(count * 0.34);
      const mediumCount = Math.ceil(count * 0.33);
      const hardCount = count - easyCount - mediumCount;

      const selected = [
        ...easy.slice(0, easyCount),
        ...medium.slice(0, mediumCount),
        ...hard.slice(0, hardCount),
      ];

      if (selected.length < count) {
        const remaining = allQuestions
          .filter((question) => !selected.includes(question))
          .sort(() => Math.random() - 0.5)
          .slice(0, count - selected.length);
        selected.push(...remaining);
      }

      return selected.sort(() => Math.random() - 0.5);
    },
    [getAllQuestions]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeRemaining <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return {
            ...prev,
            timeRemaining: 0,
            isAnswerRevealed: true,
            incorrectAnswers: prev.incorrectAnswers + 1,
            streak: 0,
            secondChanceArmed: false,
            secondChanceFirstWrongAnswer: null,
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clearAutoNext = useCallback(() => {
    if (autoNextRef.current) {
      clearTimeout(autoNextRef.current);
      autoNextRef.current = null;
    }
  }, []);

  const startQuiz = useCallback(
    (mode: QuizMode = "25") => {
      const questionCount = mode === "25" ? 25 : 50;
      const questions = getQuestions(questionCount);
      selectionLockRef.current = false;
      clearAutoNext();

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
        fiftyFiftyUsed: false,
        swapQuestionUsed: false,
        secondChanceUsed: false,
        secondChanceArmed: false,
        secondChanceFirstWrongAnswer: null,
        hiddenAnswerIndexes: [],
      });
    },
    [clearAutoNext, getQuestions]
  );

  useEffect(() => {
    if (state.isQuizStarted && !state.isQuizFinished && !state.isAnswerRevealed) {
      startTimer();
    }
    return () => stopTimer();
  }, [
    state.isQuizStarted,
    state.isQuizFinished,
    state.currentQuestionIndex,
    state.isAnswerRevealed,
    startTimer,
    stopTimer,
  ]);

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (
        selectionLockRef.current ||
        state.isAnswerRevealed ||
        state.selectedAnswer !== null ||
        state.hiddenAnswerIndexes.includes(answerIndex) ||
        state.secondChanceFirstWrongAnswer === answerIndex
      ) {
        return;
      }
      selectionLockRef.current = true;

      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswer;

      if (
        state.secondChanceArmed &&
        state.secondChanceFirstWrongAnswer === null &&
        !isCorrect
      ) {
        setState((prev) => ({
          ...prev,
          secondChanceFirstWrongAnswer: answerIndex,
        }));
        selectionLockRef.current = false;
        return;
      }

      stopTimer();

      setState((prev) => ({
        ...prev,
        selectedAnswer: answerIndex,
        isAnswerRevealed: true,
        score: isCorrect ? prev.score + calculatePoints(prev.timeRemaining) : prev.score,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        incorrectAnswers: isCorrect ? prev.incorrectAnswers : prev.incorrectAnswers + 1,
        streak: isCorrect ? prev.streak + 1 : 0,
        maxStreak: isCorrect ? Math.max(prev.maxStreak, prev.streak + 1) : prev.maxStreak,
        secondChanceArmed: false,
        secondChanceFirstWrongAnswer: null,
      }));
    },
    [
      state.isAnswerRevealed,
      state.selectedAnswer,
      state.hiddenAnswerIndexes,
      state.secondChanceFirstWrongAnswer,
      state.questions,
      state.currentQuestionIndex,
      state.secondChanceArmed,
      stopTimer,
    ]
  );

  const nextQuestion = useCallback(() => {
    clearAutoNext();
    selectionLockRef.current = false;
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      setState((prev) => ({ ...prev, isQuizFinished: true }));
      return;
    }

    setState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswer: null,
      isAnswerRevealed: false,
      timeRemaining: QUESTION_TIME,
      secondChanceArmed: false,
      secondChanceFirstWrongAnswer: null,
      hiddenAnswerIndexes: [],
    }));
  }, [clearAutoNext, state.currentQuestionIndex, state.questions.length]);

  const useFiftyFifty = useCallback(() => {
    if (state.fiftyFiftyUsed || state.isAnswerRevealed || !state.questions[state.currentQuestionIndex]) {
      return;
    }

    const currentQuestion = state.questions[state.currentQuestionIndex];
    const wrongAnswers = [0, 1, 2, 3].filter(
      (answerIndex) => answerIndex !== currentQuestion.correctAnswer
    );
    const keepWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    const hiddenAnswerIndexes = wrongAnswers.filter(
      (answerIndex) => answerIndex !== keepWrongAnswer
    );

    setState((prev) => ({
      ...prev,
      fiftyFiftyUsed: true,
      hiddenAnswerIndexes,
      selectedAnswer:
        prev.selectedAnswer !== null && hiddenAnswerIndexes.includes(prev.selectedAnswer)
          ? null
          : prev.selectedAnswer,
      secondChanceFirstWrongAnswer:
        prev.secondChanceFirstWrongAnswer !== null &&
        hiddenAnswerIndexes.includes(prev.secondChanceFirstWrongAnswer)
          ? null
          : prev.secondChanceFirstWrongAnswer,
    }));
  }, [state.fiftyFiftyUsed, state.isAnswerRevealed, state.questions, state.currentQuestionIndex]);

  const useSwapQuestion = useCallback(() => {
    if (state.swapQuestionUsed || state.isAnswerRevealed) {
      return;
    }

    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) {
      return;
    }

    const allQuestions = getAllQuestions();
    const currentSetIds = new Set(state.questions.map((question) => question.id));
    let candidates = allQuestions.filter(
      (question) =>
        question.difficulty === currentQuestion.difficulty &&
        !currentSetIds.has(question.id)
    );

    if (candidates.length === 0) {
      candidates = allQuestions.filter((question) => !currentSetIds.has(question.id));
    }

    if (candidates.length === 0) {
      candidates = allQuestions.filter((question) => question.id !== currentQuestion.id);
    }

    if (candidates.length === 0) {
      return;
    }

    const replacementQuestion = candidates[Math.floor(Math.random() * candidates.length)];

    setState((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[prev.currentQuestionIndex] = replacementQuestion;

      return {
        ...prev,
        questions: updatedQuestions,
        swapQuestionUsed: true,
        selectedAnswer: null,
        isAnswerRevealed: false,
        timeRemaining: QUESTION_TIME,
        secondChanceArmed: false,
        secondChanceFirstWrongAnswer: null,
        hiddenAnswerIndexes: [],
      };
    });
  }, [state.swapQuestionUsed, state.isAnswerRevealed, state.questions, state.currentQuestionIndex, getAllQuestions]);

  const useSecondChance = useCallback(() => {
    if (
      state.secondChanceUsed ||
      state.isAnswerRevealed ||
      state.secondChanceArmed ||
      state.secondChanceFirstWrongAnswer !== null
    ) {
      return;
    }

    setState((prev) => ({
      ...prev,
      secondChanceUsed: true,
      secondChanceArmed: true,
    }));
  }, [
    state.secondChanceUsed,
    state.isAnswerRevealed,
    state.secondChanceArmed,
    state.secondChanceFirstWrongAnswer,
  ]);

  const restartQuiz = useCallback(() => {
    stopTimer();
    clearAutoNext();
    selectionLockRef.current = false;
    setState((prev) => ({ ...prev, isQuizStarted: false, isQuizFinished: false }));
  }, [stopTimer, clearAutoNext]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  useEffect(() => {
    if (!state.isAnswerRevealed || state.selectedAnswer === null) {
      return;
    }
    clearAutoNext();
    autoNextRef.current = setTimeout(() => {
      nextQuestion();
    }, 2500);
    return () => clearAutoNext();
  }, [state.isAnswerRevealed, state.selectedAnswer, nextQuestion, clearAutoNext]);

  const currentQuestion = state.questions[state.currentQuestionIndex] || null;
  const progress =
    state.questions.length > 0
      ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100
      : 0;
  const totalQuestions = state.mode === "25" ? 25 : 50;

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
    restartQuiz,
    useFiftyFifty,
    useSwapQuestion,
    useSecondChance,
  };
}

function calculatePoints(timeRemaining: number): number {
  const basePoints = 100;
  const timeBonus = Math.floor(timeRemaining * 5);
  return basePoints + timeBonus;
}
