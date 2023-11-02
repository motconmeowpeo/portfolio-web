import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '@core/models';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { format } from 'date-fns';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PostFacade } from '@core/services/post';
import { DialogService } from '@ngneat/dialog';
import { ConfirmDeleteComponent } from '../../ui/modal/confirm-delete/confirm-delete.component';
import { ModalCloseStatus } from '@core/enums';
import { MenuComponent } from '../../ui/menu/menu.component';
import { URL_IMAGE } from '@core/constants';
import { AuthFacade } from '@core/services/auth';
import { LoadingSmallComponent } from '../loading-small/loading-small.component';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, MenuComponent, LoadingSmallComponent],
  templateUrl: './post-item.component.html',
})
export class PostItemComponent implements OnInit {
  readonly faUser = faUser;
  readonly faTrash = faTrash;
  readonly faPen = faPen;
  readonly URL_IMAGE = URL_IMAGE;
  isLoading = false;
  user$ = this.authFacade.user$;
  safeHtml!: SafeHtml;
  @Input() post!: IPost;

  constructor(
    private sanitizer: DomSanitizer,
    private postFacade: PostFacade,
    private dialog: DialogService,
    private authFacade: AuthFacade
  ) { }
  formatDate(date: string | Date) {
    return format(new Date(date), 'HH:mm dd-MM-yyyy');
  }

  ngOnInit(): void {
    this.sanitizeHtml();
  }

  sanitizeHtml() {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.post.description
    );
  }

  openDeletePost() {
    this.dialog
      .open(ConfirmDeleteComponent, {
        size: 'md',
      })
      .afterClosed$.subscribe((result) => {
        if (result === ModalCloseStatus.COMPLETE) {
          this.isLoading = true;
          this.postFacade.delete(this.post._id).pipe(
            tap(() => {
              this.isLoading = false;
            }), catchError(er => {
              this.isLoading = false;
              return of(er)
            })
          ).subscribe();
        }
      });
  }
}
