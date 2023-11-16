import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as AOS from 'aos';
import { ButtonComponent, MenuComponent } from '@core/ui';
import { faArrowRightFromBracket, faRocket } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { NAV_ICON, NAV_MENU } from '@core/constants';
import { AuthFacade } from '@core/services/auth';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonComponent,
    RouterModule,
    MenuComponent
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') header!: ElementRef<HTMLDivElement>;
  user$ = this.authFacade.user$
  readonly NAV_MENU = NAV_MENU;
  readonly NAV_ICON = NAV_ICON;
  readonly faRocket = faRocket;
  readonly faBack = faArrowRightFromBracket;

  constructor(private cd: ChangeDetectorRef, private authFacade: AuthFacade, private router: Router) { }
  ngOnInit(): void {
    AOS.init({
      duration: 400,
      once: true,
    });
  }

  logOut() {
    this.authFacade.logOut();
    this.router.navigate(['/home'])
  }
}

