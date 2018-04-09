import { QuizResult, QuizCharacter } from './../models';
import { SwapiService } from './swapi.service';
import { SwiapiService } from './swiapi.service';
import { HelpersService } from './helpers.service';
import { ScoreService } from './score.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/retry';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CharacterDetailComponent, SaveScoreComponent } from '../components/dialogs';

@Injectable()
export class QuizService {
  public options = {
    duration: 20 // indicates the time in which quiz needs to be completed. 0 means unlimited.
  };

  public timeElapsed: number;
  public answereds: QuizCharacter[] = [];
  public currentIndex: number;

  private _timer: any = null;
  private _onEndGame = new EventEmitter<QuizResult>();
  private _currentSource = new BehaviorSubject<QuizCharacter>(null);
  private _nextCharacter: QuizCharacter;
  public _indexes = [];
  private _bsModalRef: BsModalRef;
  private _processingNext = false;

  constructor(
    private modalService: BsModalService,
    private swapi: SwapiService,
    private swiapi: SwiapiService,
    private scores: ScoreService
  ) {
    this.timeElapsed = 0;
  }

  private createShuffleIndexes(count: number) {
    for (let i = 1; i <= count + 1; i++) {
      if (i !== 17) {
        // TODO: Foi feito esta correção temporaria, pois não existe o personagem 17.
        this._indexes.push(i);
      }
    }

    this._indexes = HelpersService.shuffleArray(this._indexes);
  }

  private loadNextCharacter() {
    const nextIdx = this._indexes[this.currentIndex + 1];
    this.swapi
      .getPerson(nextIdx)
      .retry(3)
      .map(person => this.mapCharacter(person))
      .subscribe(person => (this._nextCharacter = person));
  }

  private mapCharacter(person): QuizCharacter {
    person.homeworld = this.swapi.get(person.homeworld);
    person.img = this.swiapi.getPersonImage(
      HelpersService.extractIdFromUrl(person.url)
    );
    person.films = this.swapi.getMultiple(person.films);
    person.species = this.swapi.getMultiple(person.species);

    this._processingNext = false;
    return new QuizCharacter(person);
  }

  private gotoNextCharacter() {
    if (this.isPlaying() && !this._processingNext) {
      this._processingNext = true;
      this._currentSource.next(this._nextCharacter);

      this.currentIndex++;
      if (this.currentIndex >= this._indexes.length) {
        this.finish();
      } else if (this.currentIndex < this._indexes.length - 1) {
        this.loadNextCharacter();
      }
    }
  }

  private closeDialog() {
    if (this._bsModalRef) {
      this._bsModalRef.hide();
      this._bsModalRef = null;
    }
  }

  private get current(): QuizCharacter {
    return this._currentSource.value;
  }

  get currentCharacter(): Observable<QuizCharacter> {
    return this._currentSource.asObservable();
  }

  get onEndGame(): EventEmitter<QuizResult> {
    return this._onEndGame;
  }

  start() {
    if (!this.isPlaying()) {
      this.swapi.getPeople(1).subscribe(response => {
        this.createShuffleIndexes(response.count);

        this.currentIndex = 0;
        this.answereds = [];
        const idx = this._indexes[this.currentIndex];
        this.swapi
          .getPerson(idx)
          .retry(3)
          .map(person => this.mapCharacter(person))
          .subscribe(person => this._currentSource.next(person));
        this.loadNextCharacter();

        this.timeElapsed = 0;
        this._timer = Observable.interval(1000).subscribe(() => {
          this.timeElapsed++;
          if (this.timeElapsed >= this.options.duration) {
            this.finish();
          }
        });
      });
    }
  }

  jump() {
    this.gotoNextCharacter();
  }

  finish() {
    if (this.isPlaying()) {
      this._timer.unsubscribe();
      this._timer = null;
      this._currentSource.next(null);

      this._onEndGame.emit(new QuizResult(this.answereds));
    }
  }

  isPlaying(): boolean {
    return this._timer != null;
  }

  setAnswer(name: string) {
    this.current.answer = name;
    this.current.isCorrect =
    this.current.answer &&
      HelpersService.textCompare(this.current.name, this.current.answer);
    this.answereds.push(this.current);
    this.gotoNextCharacter();
  }

  showCharacterDetail() {
    this.closeDialog();
    this._currentSource.value.showedTip = true;

    const initialState = {
      character: this._currentSource.value
    };
    this._bsModalRef = this.modalService.show(CharacterDetailComponent, {
      initialState
    });
  }

  showScoreSaveDialog(result: QuizResult) {
    this.closeDialog();
    const initialState = {
      'result': result,
      externalSave: (score) => {
        this.scores.save(score);
      }
    };
    this._bsModalRef = this.modalService.show(SaveScoreComponent, {
      initialState
    });
  }
}
