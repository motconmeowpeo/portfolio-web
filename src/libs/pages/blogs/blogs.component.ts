import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { URL_IMAGE } from '@core/constants';
import { PostFacade } from '@core/services/post';
import { CreatePostComponent } from '@core/ui/modal';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { DialogService } from '@ngneat/dialog';
import { catchError, debounceTime, delay, tap } from 'rxjs';
import { AuthFacade } from '../../core/services/auth/auth.facade';
import { CommonModule } from '@angular/common';
import { FooterComponent, PostItemComponent } from '@core/components';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ButtonComponent } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from '@core/components/loading';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IBaseParams } from '@core/models';

export interface ISearch {
  search: FormControl<string>
}
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NzPaginationModule,
    PostItemComponent,
    NzImageModule,
    RouterModule,
    ButtonComponent,
    FontAwesomeModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
})
export class BlogsComponent implements OnInit {
  readonly faPaperPlane = faPaperPlane;
  readonly SEARCH_DEBOUNCE_TIME = 500;
  isLoading = false;
  posts$ = this.postFacade.posts$;
  user$ = this.authFacade.user$;
  form!: FormGroup<ISearch>;
  search!: string

  constructor(
    private router: Router,
    private postFacade: PostFacade,
    private authFacade: AuthFacade,
    private dialog: DialogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      // Retrieve query parameters here
      this.search = params['q'];
      this.getAll({ search: this.search || '' });
    });
    this.form = new FormGroup({
      search: new FormControl(this.search || '', { nonNullable: true, updateOn: 'change' })
    })
    this.form.controls.search.valueChanges.pipe(
      debounceTime(this.SEARCH_DEBOUNCE_TIME),
      tap((value) => {
        this.router.navigate([], {
          queryParams: {
            q: value ? value : undefined
          },
          queryParamsHandling: 'merge',
        })
        this.getAll({ search: value })
      })
    ).subscribe()
  }


  pageIndexChange(index: number) { }

  openModal() {
    this.dialog.open(CreatePostComponent, {
      size: 'lg',
    });
  }

  getAll(params?: IBaseParams) {
    this.isLoading = true;
    this.postFacade
      .getAll(params)
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


}
