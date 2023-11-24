import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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
import { debounce } from 'lodash'
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
  topSpace = 0;
  readonly NAV_MENU = NAV_MENU;
  readonly NAV_ICON = NAV_ICON;
  readonly faRocket = faRocket;
  readonly faBack = faArrowRightFromBracket;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: MouseEvent) {
    const currentTopSpace = document.documentElement.scrollTop;
    if (this.topSpace < currentTopSpace) {
      this.header.nativeElement.style.opacity = '0.6';
      this.topSpace = currentTopSpace;
    }
    else {
      this.header.nativeElement.style.opacity = '1';
      this.topSpace = currentTopSpace;
    }
  }

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

