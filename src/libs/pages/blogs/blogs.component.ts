import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostFacade } from '@core/services/post';
import { CreatePostComponent } from '@core/ui/modal';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  readonly faPaperPlane = faPaperPlane;

  posts$ = this.postFacade.getAll();

  constructor(
    private routes: Router,
    private postFacade: PostFacade,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.postFacade.getAll().subscribe();
  }
  gotoSendMessage() {
    this.routes.navigateByUrl('/home?goto=true');
  }

  pageIndexChange(index: number) {
    console.log(index);
  }

  openModal() {
    console.log('OPEN');
    this.dialog.open(CreatePostComponent, {
      size: 'md',
    });
  }

  handleCancel() {}
  handlePost() {
    console.log('Post');
  }
}
