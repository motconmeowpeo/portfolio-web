import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css'],
})
export class SkillItemComponent {
  @Input() name!: string;
  @Input() desc!: string;
  @Input() icon!: any;
  @Input() color!: string;

  public checkIsString() {
    return typeof this.icon === 'string';
  }
}
