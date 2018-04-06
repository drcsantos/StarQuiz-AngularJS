import { IQuizResult } from './quiz-result.model';
export interface IQuizScore {
  name: string;
  email: string;
  result: IQuizResult;
  isLast: boolean;
}
