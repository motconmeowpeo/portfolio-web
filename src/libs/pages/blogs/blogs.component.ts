import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URL_IMAGE } from '@core/constants';
import { PostFacade } from '@core/services/post';
import { CreatePostComponent } from '@core/ui/modal';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { DialogService } from '@ngneat/dialog';
import { catchError, delay, tap } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  readonly faPaperPlane = faPaperPlane;

  isLoading = false;
  posts$ = this.postFacade.posts$;

  constructor(
    private routes: Router,
    private postFacade: PostFacade,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postFacade
      .getAll()
      .pipe(
        tap(() => {
          this.isLoading = false;
        }),
        catchError((err) => {
          this.isLoading = false;
          return err;
        })
      )
      .subscribe();
  }
  gotoSendMessage() {
    this.routes.navigateByUrl('/home?goto=true');
  }

  pageIndexChange(index: number) {}

  openModal() {
    this.dialog.open(CreatePostComponent, {
      size: 'lg',
    });
  }
}
