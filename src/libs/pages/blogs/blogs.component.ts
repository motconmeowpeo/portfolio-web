import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
})
export class BlogsComponent implements OnInit {
  constructor(private routes: Router) {}

  ngOnInit() {}
  gotoSendMessage() {
    this.routes.navigateByUrl('/home?goto=true');
  }
}
