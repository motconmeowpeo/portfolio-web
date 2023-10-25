import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './skill-item.component.html',
})
export class SkillItemComponent {
  @Input() name!: string;
  @Input() desc!: string;
  @Input() icon!: string;
  @Input() color!: string;
}
