import { IQuizScore } from './../../models';
import { ScoreService } from './../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  scores: IQuizScore[];

  constructor(private score: ScoreService) {}

  ngOnInit() {
    this.score.scores.subscribe(
      response =>
        (this.scores = response.sort((left: IQuizScore, right: IQuizScore) => {
          if (left.result.score > right.result.score) {
            return -1;
          } else if (left.result.score < right.result.score) {
            return 1;
          }

          return 0;
        }))
    );
  }
}
