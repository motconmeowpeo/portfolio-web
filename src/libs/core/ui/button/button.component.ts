import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() content!: string;
  @Input() className: string = 'h-14';
  @Input() type: string = 'primary' || 'secondary';
  @Input() icon!: IconDefinition;
  @Input() disabled = false;
  @Input() link!: string
  @Output() event: EventEmitter<void> = new EventEmitter();

  buttonClickEvt() {
    this.event.emit();
  }
}
