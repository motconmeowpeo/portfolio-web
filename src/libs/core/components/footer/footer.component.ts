import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GET_IN_TOUCH, NAV_ICON } from '@core/constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '@core/ui';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { OUR_SERVICES, POPULAR_TAGS } from '../../constants/menu.constant';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly NAV_ICON = NAV_ICON;
  readonly GET_IN_TOUCH = GET_IN_TOUCH;
  readonly OUR_SERVICES = OUR_SERVICES;
  readonly POPULAR_TAGS = POPULAR_TAGS;
  readonly faMessage = faMessage;
  @Output() goToSend: EventEmitter<void> = new EventEmitter<void>();

  gotoSendMessage() {
    this.goToSend.emit();
  }
}
