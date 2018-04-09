import { IQuizScore } from './quiz-score.model';
import { QuizCharacter } from './quiz-character.model';

export interface IQuizResult {
  hits: number;
  mistakes: number;
  tips: number;
  score: number;
}

export class QuizResult implements IQuizResult {
  private _hits: number;
  private _mistakes: number;
  private _tips: number;

  constructor(public answers: QuizCharacter[]) {
    this._hits = 0;
    this._mistakes = 0;
    this._tips = 0;
    this.answers.forEach((person, index) => {
      if (person.answer && person.answer !== '') {
        if (person.showedTip && person.isCorrect) {
          this._tips++;
        }

        if (person.isCorrect) {
          this._hits++;
        } else {
          this._mistakes++;
        }
      } else {
        this._mistakes++;
      }
    });
  }

  get hits(): number {
    return this._hits;
  }

  get mistakes(): number {
    return this._mistakes;
  }

  get tips(): number {
    return this._tips;
  }

  get score(): number {
    return this._hits * 10 - this._tips * 5;
  }

  getData(): IQuizResult {
    return {
      hits: this._hits,
      mistakes: this._mistakes,
      tips: this._tips,
      score: this.score
    };
  }
}
