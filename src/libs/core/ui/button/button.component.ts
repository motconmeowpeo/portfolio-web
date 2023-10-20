import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MatIconModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() content!: string;
  @Input() className!: string;
  @Input() type = 'primary';
  @Input() icon!: IconDefinition;
}
