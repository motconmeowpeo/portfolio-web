import { Injectable } from '@angular/core';
import {
  NzNotificationDataOptions,
  NzNotificationService,
} from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class ToastNotificationService {
  constructor(private notificationService: NzNotificationService) {}

  success(title: string, content: string, options?: NzNotificationDataOptions) {
    this.notificationService.success(title, content, options);
  }

  error(title: string, content: string, options?: NzNotificationDataOptions) {
    this.notificationService.error(title, content, options);
  }

  warning(title: string, content: string, options?: NzNotificationDataOptions) {
    this.notificationService.warning(title, content, options);
  }

  info(title: string, content: string, options?: NzNotificationDataOptions) {
    this.notificationService.info(title, content, options);
  }
}
