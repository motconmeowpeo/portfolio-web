import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProjectItem } from '@core/models';
import { ButtonComponent } from '@core/ui';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './project-item.component.html',
})
export class ProjectItemComponent {
  @Input() item!: IProjectItem;
  @Input() textBtn: string = 'Visit website'
  @Input() isProject = true;
  constructor() { }

  visitWebsite(link: string) {
    link && window.open(link, '_blank');
  }
}
