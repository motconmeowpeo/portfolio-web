import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from '@core/components/loading';
import { URL_IMAGE } from '@core/constants';
import { IPost } from '@core/models';
import { PostFacade } from '@core/services/post';
import { format } from 'date-fns';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NzImageModule,
    LoadingComponent,
    NzCarouselModule,
    RouterModule,
    FontAwesomeModule
  ],
})
export class PostDetailComponent implements OnInit {
  readonly URL_IMAGE = URL_IMAGE;
  readonly faChevronLeft = faChevronLeft;

  post$ = this.postFacade.post$;
  safeHtml!: SafeHtml;
  search!: string;

  constructor(
    private route: ActivatedRoute,
    private postFacade: PostFacade,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Retrieve query parameters here
      this.search = params['q'];

    });
    this.route.params.subscribe((params) => {
      const id = params['id']; // 'id' should match the parameter name in the route
      if (id) {
        this.postFacade.getPostById(id).subscribe((post) => {
          this.sanitizeHtml(post);
        });
      }
    });
  }

  formatDate(date: string | Date) {
    return format(new Date(date), 'HH:mm dd-MM-yyyy');
  }

  sanitizeHtml(post: IPost) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(post.description);
  }

}
