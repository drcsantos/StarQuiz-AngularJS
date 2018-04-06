import { QuizResult, QuizCharacter } from './../../models';
import { QuizService } from './../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  typedAnswer: string;
  person: QuizCharacter;
  result: QuizResult;
  loading = true;

  constructor(public quiz: QuizService) {}

  ngOnInit() {
    this.quiz.onEndGame.subscribe(response => {
      this.result = response;
      setTimeout(() => {
        this.quiz.showScoreSaveDialog(response);
      }, 2000);
    });
    this.quiz.start();
    this.quiz.currentCharacter.subscribe(current => {
      this.person = current;
      this.loading = false;
    });
  }

  submitAnswer() {
    this.loading = true;
    this.quiz.setAnswer(this.typedAnswer);
    this.typedAnswer = '';
  }

  showCharacterDetail() {
    this.quiz.showCharacterDetail();
  }
}
