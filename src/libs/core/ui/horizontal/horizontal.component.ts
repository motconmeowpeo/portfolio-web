import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal.component.html',
})
export class HorizontalComponent {
  @Input() selfRight = true;
}
