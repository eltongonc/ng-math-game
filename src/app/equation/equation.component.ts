import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../classes/math-validators';
import { delay, filter, scan, tap } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss'],
})
export class EquationComponent {
  @Input() type!: string;

  secPerSolution = 0;
  answerCorrect = 0;
  hasAnsweredCorrectly = false;

  initialValues = {
    fieldA: this.getRandomNumber(),
    fieldB: this.getRandomNumber(),
    userInput: '',
  };

  mathForm = new FormGroup(
    {
      fieldA: new FormControl<number>(this.initialValues.fieldA),
      fieldB: new FormControl<number>(this.initialValues.fieldB),
      userInput: new FormControl<string>(this.initialValues.userInput),
    },
    [MathValidators.addition('fieldA', 'fieldB', 'userInput')]
  );

  get fieldA() {
    return `${this.mathForm.value.fieldA}`;
  }
  get fieldB() {
    return `${this.mathForm.value.fieldB}`;
  }

  generateNewQuestion() {
    this.hasAnsweredCorrectly = false;

    this.mathForm.setValue({
      fieldA: this.getRandomNumber(),
      fieldB: this.getRandomNumber(),
      userInput: '',
    });
  }

  getRandomNumber() {
    return Math.ceil(Math.random() * 10);
  }

  ngOnInit() {
    const startTime = new Date();

    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        tap((value) => {
          if (value === 'VALID') {
            this.hasAnsweredCorrectly = true;
          }
        }),
        delay(500)
      )
      .subscribe((value) => {
        if (value === 'INVALID') {
          return;
        }

        if (value === 'VALID') {
          this.answerCorrect++;

          this.secPerSolution =
            (new Date().getTime() - startTime.getTime()) /
            this.answerCorrect /
            1000;

          // add a success class to the input
          this.hasAnsweredCorrectly = true;

          //then generate new question
          this.generateNewQuestion();
        }

        return value;
      });
  }
}
