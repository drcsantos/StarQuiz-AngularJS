import { Component, OnInit, Input } from '@angular/core';
import { QuizResult, QuizCharacter } from '../../../models';

@Component({
  selector: 'app-quiz-result-view',
  templateUrl: './quiz-result-view.component.html',
  styleUrls: ['./quiz-result-view.component.scss']
})
export class QuizResultViewComponent implements OnInit {

  @Input() result: QuizResult;

  constructor() { }

  ngOnInit() {
  }

  getAnswers(): QuizCharacter[] {
    return this.result.answers.filter(person => person.answer && person.answer !== '');
  }

}
