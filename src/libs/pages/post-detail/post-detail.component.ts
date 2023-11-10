import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '@core/components/loading';
import { URL_IMAGE } from '@core/constants';
import { IPost } from '@core/models';
import { PostFacade } from '@core/services/post';
import { format } from 'date-fns';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

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
  ],
})
export class PostDetailComponent implements OnInit {
  post$ = this.postFacade.post$;
  readonly URL_IMAGE = URL_IMAGE;
  safeHtml!: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private postFacade: PostFacade,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
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
