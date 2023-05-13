import { Component } from '@angular/core';
import { EquationType } from './types/equation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  type = '+';

  handleSelectType(id: EquationType) {
    switch (id) {
      case 'additions':
        this.type = '+';
        break;
      case 'division':
        this.type = ':';
        break;
      case 'multiplications':
        this.type = 'x';
        break;
      case 'subtractions':
        this.type = '-';
        break;

      default:
        break;
    }
  }
}
