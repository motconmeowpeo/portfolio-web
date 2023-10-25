import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '@core/models';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './post-item.component.html',
})
export class PostItemComponent {
  readonly faUser = faUser;
  @Input() post!: IPost;
}
