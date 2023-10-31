import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@core/ui';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { PostFacade } from '@core/services/post';
import { ModalCloseStatus } from '@core/enums';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './confirm-delete.component.html',
})
export class ConfirmDeleteComponent {
  constructor(private dialog: DialogRef) {}

  close() {
    this.dialog.close(ModalCloseStatus.CANCEL);
  }

  submit() {
    this.dialog.close(ModalCloseStatus.COMPLETE);
  }
}
