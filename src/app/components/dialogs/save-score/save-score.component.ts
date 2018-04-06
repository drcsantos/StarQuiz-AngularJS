import { QuizResult, IQuizScore } from './../../../models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-save-score',
  templateUrl: './save-score.component.html',
  styleUrls: ['./save-score.component.scss']
})
export class SaveScoreComponent implements OnInit {

  result: QuizResult;
  externalSave: any;

  mainForm: FormGroup;
  name: FormControl;
  email: FormControl;

  constructor(public bsModalRef: BsModalRef) {
    this.createFormControls();
    this.createForm();
  }

  ngOnInit() {
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl(null, Validators.email);
  }

  createForm() {
    this.mainForm = new FormGroup({
      name: this.name,
      email: this.email
    });
  }

  getValue(): IQuizScore {
    return {
      ...this.mainForm.value,
      result: this.result.getData(),
      isLast: true
    };
  }

  save() {
    if (this.externalSave) {
      this.externalSave(this.getValue());
      this.bsModalRef.hide();
    }
  }
}
