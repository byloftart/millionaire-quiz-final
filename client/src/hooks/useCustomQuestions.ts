import { useState, useCallback } from 'react';
import { Question } from '@/data/questions';
import { useLocalStorage } from './useLocalStorage';

export interface ImportResult {
  success: boolean;
  message: string;
  importedCount: number;
}

export function useCustomQuestions() {
  const [customQuestions, setCustomQuestions] = useLocalStorage<Question[]>('custom_questions', []);
  const [isImporting, setIsImporting] = useState(false);

  // Валидация структуры вопроса
  const validateQuestion = (q: any, index: number): { valid: boolean; error?: string } => {
    if (!q.question || typeof q.question !== 'string') {
      return { valid: false, error: `Вопрос #${index + 1}: отсутствует текст вопроса` };
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      return { valid: false, error: `Вопрос #${index + 1}: должно быть ровно 4 варианта ответа` };
    }
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
      return { valid: false, error: `Вопрос #${index + 1}: correctAnswer должен быть числом от 0 до 3` };
    }
    if (!q.category || typeof q.category !== 'string') {
      return { valid: false, error: `Вопрос #${index + 1}: отсутствует категория` };
    }
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
      return { valid: false, error: `Вопрос #${index + 1}: difficulty должен быть easy, medium или hard` };
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
        return { success: false, message: 'Ошибка: файл не является валидным JSON', importedCount: 0 };
      }

      // Поддержка как массива вопросов, так и объекта с полем questions
      const questionsArray = Array.isArray(data) ? data : data.questions;
      
      if (!Array.isArray(questionsArray)) {
        return { success: false, message: 'Ошибка: ожидается массив вопросов или объект с полем "questions"', importedCount: 0 };
      }

      if (questionsArray.length === 0) {
        return { success: false, message: 'Ошибка: файл не содержит вопросов', importedCount: 0 };
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
        message: `Успешно импортировано ${newQuestions.length} вопросов!`, 
        importedCount: newQuestions.length 
      };
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, message: 'Произошла ошибка при импорте файла', importedCount: 0 };
    } finally {
      setIsImporting(false);
    }
  }, [customQuestions, setCustomQuestions]);

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
