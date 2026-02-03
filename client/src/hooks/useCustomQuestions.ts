import { useState, useCallback } from 'react';
import { Question } from '@/data/questions';
import { useLocalStorage } from './useLocalStorage';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

export interface ImportResult {
  success: boolean;
  message: string;
  importedCount: number;
}

export function useCustomQuestions(explicitLanguage?: Language) {
  const { language, t } = useLanguage();
  const activeLanguage = explicitLanguage || language;
  const storageKey = `custom_questions_${activeLanguage}`;
  const [customQuestions, setCustomQuestions] = useLocalStorage<Question[]>(storageKey, []);
  const [isImporting, setIsImporting] = useState(false);

  const formatMessage = useCallback((template: string, params: Record<string, string | number>) => {
    return Object.entries(params).reduce(
      (message, [key, value]) => message.replaceAll(`{{${key}}}`, String(value)),
      template
    );
  }, []);

  // Валидация структуры вопроса
  const validateQuestion = (q: any, index: number): { valid: boolean; error?: string } => {
    if (!q.question || typeof q.question !== 'string') {
      return { valid: false, error: formatMessage(t.importErrorQuestionText, { index: index + 1 }) };
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      return { valid: false, error: formatMessage(t.importErrorOptions, { index: index + 1 }) };
    }
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
      return { valid: false, error: formatMessage(t.importErrorCorrectAnswer, { index: index + 1 }) };
    }
    if (!q.category || typeof q.category !== 'string') {
      return { valid: false, error: formatMessage(t.importErrorCategory, { index: index + 1 }) };
    }
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
      return { valid: false, error: formatMessage(t.importErrorDifficulty, { index: index + 1 }) };
    }
    return { valid: true };
  };

  // Импорт вопросов из JSON
  const importFromJSON = useCallback(async (file: File): Promise<ImportResult> => {
    setIsImporting(true);
    
    try {
      const text = await file.text();
      let data: any;
      
      try {
        data = JSON.parse(text);
      } catch {
        return { success: false, message: t.importErrorInvalidJson, importedCount: 0 };
      }

      // Поддержка как массива вопросов, так и объекта с полем questions
      const questionsArray = Array.isArray(data) ? data : data.questions;
      
      if (!Array.isArray(questionsArray)) {
        return { success: false, message: t.importErrorInvalidStructure, importedCount: 0 };
      }

      if (questionsArray.length === 0) {
        return { success: false, message: t.importErrorEmpty, importedCount: 0 };
      }

      // Валидация каждого вопроса
      for (let i = 0; i < questionsArray.length; i++) {
        const validation = validateQuestion(questionsArray[i], i);
        if (!validation.valid) {
          return { success: false, message: validation.error!, importedCount: 0 };
        }
      }

      // Генерация уникальных ID для новых вопросов
      const maxExistingId = customQuestions.reduce((max, q) => Math.max(max, q.id), 1000);
      const newQuestions: Question[] = questionsArray.map((q, index) => ({
        id: maxExistingId + index + 1,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        category: q.category,
        difficulty: q.difficulty as 'easy' | 'medium' | 'hard'
      }));

      // Добавляем к существующим пользовательским вопросам
      setCustomQuestions(prev => [...prev, ...newQuestions]);

      return {
        success: true,
        message: formatMessage(t.importSuccess, { count: newQuestions.length }),
        importedCount: newQuestions.length,
      };
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, message: t.importErrorGeneric, importedCount: 0 };
    } finally {
      setIsImporting(false);
    }
  }, [customQuestions, setCustomQuestions, formatMessage, t]);

  // Очистка пользовательских вопросов
  const clearCustomQuestions = useCallback(() => {
    setCustomQuestions([]);
  }, [setCustomQuestions]);

  // Удаление конкретного вопроса
  const removeQuestion = useCallback((id: number) => {
    setCustomQuestions(prev => prev.filter(q => q.id !== id));
  }, [setCustomQuestions]);

  return {
    customQuestions,
    isImporting,
    importFromJSON,
    clearCustomQuestions,
    removeQuestion,
    customQuestionsCount: customQuestions.length
  };
}
