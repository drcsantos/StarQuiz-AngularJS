import { QuizService } from './../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  showRanking = false;

  constructor(public quiz: QuizService) { }

  ngOnInit() {
  }

  toggleShowRanking() {
    this.showRanking = !this.showRanking;
  }

}
