/**
 * ImportQuestions Component
 * 
 * Компонент для импорта пользовательских вопросов из JSON-файла
 * Поддерживает drag-and-drop и выбор файла через диалог
 */

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Upload, FileJson, Check, X, Trash2, Download, AlertCircle } from 'lucide-react';
import { useCustomQuestions, ImportResult } from '@/hooks/useCustomQuestions';
import { toast } from 'sonner';

interface ImportQuestionsProps {
  onImportComplete?: () => void;
}

export function ImportQuestions({ onImportComplete }: ImportQuestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    customQuestions, 
    isImporting, 
    importFromJSON, 
    clearCustomQuestions,
    customQuestionsCount 
  } = useCustomQuestions();

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.name.endsWith('.json')) {
      toast.error('Пожалуйста, выберите файл в формате JSON');
      return;
    }

    const result = await importFromJSON(file);
    setImportResult(result);
    
    if (result.success) {
      toast.success(result.message);
      onImportComplete?.();
    } else {
      toast.error(result.message);
    }
  }, [importFromJSON, onImportComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleClearQuestions = useCallback(() => {
    clearCustomQuestions();
    setImportResult(null);
    toast.success('Пользовательские вопросы удалены');
  }, [clearCustomQuestions]);

  const downloadTemplate = useCallback(() => {
    const template = {
      questions: [
        {
          question: "Пример вопроса?",
          options: ["Вариант A", "Вариант B", "Вариант C", "Вариант D"],
          correctAnswer: 1,
          category: "Общие знания",
          difficulty: "easy"
        }
      ]
    };
    
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions_template.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Шаблон скачан');
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 text-sm"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Импорт вопросов</span>
          <span className="sm:hidden">Импорт</span>
          {customQuestionsCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
              +{customQuestionsCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg max-w-[95vw] mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileJson className="w-5 h-5 text-indigo-600" />
            Импорт вопросов
          </DialogTitle>
          <DialogDescription className="text-sm">
            Загрузите JSON-файл с вопросами для добавления в базу
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer
              transition-all duration-200
              ${isDragging 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleInputChange}
              className="hidden"
            />
            
            <motion.div
              animate={{ scale: isDragging ? 1.05 : 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                ${isDragging ? 'bg-indigo-100' : 'bg-slate-100'}
              `}>
                <Upload className={`w-6 h-6 sm:w-7 sm:h-7 ${isDragging ? 'text-indigo-600' : 'text-slate-500'}`} />
              </div>
              <div>
                <p className="font-medium text-slate-700 text-sm sm:text-base">
                  {isDragging ? 'Отпустите файл' : 'Перетащите JSON-файл сюда'}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  или нажмите для выбора файла
                </p>
              </div>
            </motion.div>

            {isImporting && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
                <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full" />
              </div>
            )}
          </div>

          {/* Import result */}
          <AnimatePresence>
            {importResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`
                  flex items-center gap-3 p-3 rounded-lg text-sm
                  ${importResult.success 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'bg-rose-50 text-rose-700'
                  }
                `}
              >
                {importResult.success ? (
                  <Check className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="flex-1">{importResult.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom questions count */}
          {customQuestionsCount > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">
                Добавлено вопросов: <strong>{customQuestionsCount}</strong>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearQuestions}
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Удалить все
              </Button>
            </div>
          )}

          {/* Format info */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-800">
                <p className="font-medium mb-1">Формат JSON-файла:</p>
                <ul className="list-disc list-inside space-y-0.5 text-amber-700">
                  <li>question — текст вопроса</li>
                  <li>options — массив из 4 вариантов</li>
                  <li>correctAnswer — индекс (0-3)</li>
                  <li>category — категория</li>
                  <li>difficulty — easy/medium/hard</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Download template button */}
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full gap-2"
          >
            <Download className="w-4 h-4" />
            Скачать шаблон JSON
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
