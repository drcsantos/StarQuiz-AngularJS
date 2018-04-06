import { QuizService } from './../../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-navbar',
  templateUrl: './quiz-navbar.component.html',
  styleUrls: ['./quiz-navbar.component.scss']
})
export class QuizNavbarComponent implements OnInit {
  constructor(private quiz: QuizService) {}

  ngOnInit() {}

  showCountDown(): boolean {
    return this.quiz.timeElapsed < this.quiz.options.duration;
  }

  countDown(): string {
    const down = this.quiz.options.duration - this.quiz.timeElapsed;
    const minutes = Math.floor(down / 60);
    const seconds = Math.floor(down % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  progress(): number {
    if (this.showCountDown) {
      return Math.floor(this.quiz.timeElapsed * 100 / this.quiz.options.duration);
    }
    return 0;
  }

  progressColor(): string {
    const progressValue = this.progress();

    if (progressValue >= 75 && progressValue <= 90) {
      return 'bg-warning';
    } else if (progressValue > 90) {
      return 'bg-danger';
    }

    return '';
  }

  playAgain() {
    this.quiz.start();
  }
}
