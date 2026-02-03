import type { Question } from "@/data/questions";
import { questions as ruQuestions } from "@/data/questions";
import type { Language } from "@/data/translations";
import azQuestionsRaw from "../../../who_wants_to_be_millionaire_az_plus.json";

type AzRawQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  categoryAz?: string;
  difficultyAz?: string;
};

const azQuestions = (azQuestionsRaw as AzRawQuestion[]).map((q) => ({
  id: q.id,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer,
  category: q.categoryAz || q.category,
  difficulty: q.difficulty,
}));

export function getBaseQuestions(language: Language): Question[] {
  return language === "az" ? azQuestions : ruQuestions;
}

export function getBaseQuestionsCount(language: Language): number {
  return getBaseQuestions(language).length;
}
