import { Component, EventEmitter, Output } from '@angular/core';
import { EquationType } from '../types/equation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() onSelectItem = new EventEmitter();

  selectedIndex = 'additions';

  items: {
    id: EquationType;
    name: string;
    iconClass: string;
  }[] = [
    {
      id: 'additions',
      name: 'Additions',
      iconClass: 'pi pi-plus',
    },
    {
      id: 'subtractions',
      name: 'Subtractions',
      iconClass: 'pi pi-minus',
    },
    {
      id: 'multiplications',
      name: 'Multiplications',
      iconClass: 'pi pi-times',
    },
    {
      id: 'division',
      name: 'Division',
      iconClass: 'pi pi-percentage',
    },
  ];

  handleNavItemClick(id: EquationType) {
    this.selectedIndex = id;
    this.onSelectItem.emit(id);
  }
}
