import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IExpItem } from '@core/models';

@Component({
  selector: 'app-exp-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exp-item.component.html',
})
export class ExpItemComponent {
  @Input() item!: IExpItem;

}
