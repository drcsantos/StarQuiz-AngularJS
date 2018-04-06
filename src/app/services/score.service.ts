import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { QuizResult, IQuizScore } from '../models';

@Injectable()
export class ScoreService {
  public static readonly KEY_NAME = 'scores';

  private _scores: IQuizScore[];
  private _scoresSource: BehaviorSubject<IQuizScore[]>;

  constructor() {
    this._scoresSource = new BehaviorSubject<IQuizScore[]>([]);
    this.update();
  }

  update() {
    const scores = JSON.parse(localStorage.getItem(ScoreService.KEY_NAME));
    if (scores) {
      this._scores = scores;
    } else {
      this._scores = [];
    }

    this._scoresSource.next(this._scores);
  }

  get scores(): Observable<IQuizScore[]> {
    return this._scoresSource.asObservable();
  }

  save(newScore: IQuizScore) {
    const found = this._scores.find(score => score.name.toLowerCase() === newScore.name.toLowerCase());

    if (found) {
      found.result = newScore.result;
    } else {
      this._scores.push(newScore);
    }

    localStorage.setItem(ScoreService.KEY_NAME, JSON.stringify(this._scores));
    this.update();
  }
}
