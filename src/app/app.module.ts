import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { SwapiService, SwiapiService, QuizService, ScoreService } from './services';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LandingComponent } from './components/landing/landing.component';
import { ROUTES } from './app.routes';
import { QuizNavbarComponent } from './components/ux/quiz-navbar/quiz-navbar.component';
import { QuizResultViewComponent } from './components/ux/quiz-result-view/quiz-result-view.component';
import { CharacterDetailComponent } from './components/dialogs/character-detail/character-detail.component';
import { SaveScoreComponent } from './components/dialogs/save-score/save-score.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    LandingComponent,
    QuizNavbarComponent,
    QuizResultViewComponent,
    CharacterDetailComponent,
    SaveScoreComponent,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot()
  ],
  providers: [
    SwapiService,
    SwiapiService,
    QuizService,
    ScoreService
  ],
  entryComponents: [
    CharacterDetailComponent,
    SaveScoreComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
