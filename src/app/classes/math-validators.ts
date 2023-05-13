import { AbstractControl } from '@angular/forms';

export class MathValidators {
  /**
   * Checks if field a + field b equals a field answer
   * @param a formGroup field
   * @param b formGroup field
   * @param answer formGroup field
   * @returns error object or null
   */
  static addition(a: string, b: string, answer: string) {
    return (form: AbstractControl) => {
      const targetAnswer = form.value[answer];
      const targetA = form.value[a];
      const targetB = form.value[b];

      if (targetA + targetB === parseInt(targetAnswer)) {
        return null;
      }

      return { addition: 'Answer is incorrect test' };
    };
  }
}
