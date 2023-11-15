import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFacade } from '@core/services/contact';
import { LoadingComponent } from '@core/components/loading';
import { FooterComponent } from '@core/components';
import { Router, Routes } from '@angular/router';
import { tap } from 'rxjs';
import { format } from 'date-fns';
import { MenuComponent } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, LoadingComponent, FooterComponent, MenuComponent, FontAwesomeModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  readonly faPen = faPen
  isLoading = false;
  contacts$ = this.contactFacade.contacts$;
  constructor(private contactFacade: ContactFacade, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.contactFacade.getAll().pipe(tap(() => this.isLoading = false)).subscribe();
  }

  gotoSendMessage() {
    this.router.navigateByUrl('/home?goto=true');
  }


  formatDate(date: string | Date) {
    if (!!date)
      return format(new Date(date), 'HH:mm dd-MM-yyyy');
    return ''
  }
}
