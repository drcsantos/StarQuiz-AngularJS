import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { QuizCharacter } from '../../../models';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: QuizCharacter;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  get specie() {
    return this.character.species && this.character.species.length > 0
      ? this.character.species.join(' + ')
      : 'Desconhecida';
  }

  format(value: string, suffix: string = '') {
    return (!value || value === '' || value === 'unknown') ? 'Desconhecido' : `${value}${suffix}`;
  }
}
