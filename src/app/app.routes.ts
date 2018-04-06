import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '' }
];
