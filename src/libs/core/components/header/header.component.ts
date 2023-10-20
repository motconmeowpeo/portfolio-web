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
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';
import { ButtonComponent } from '@core/ui';
import { fromEvent } from 'rxjs';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') header!: ElementRef<HTMLDivElement>;
  constructor(private cd: ChangeDetectorRef) {}
  readonly NAV_MENU = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/about' },
    { name: 'Blog', path: 'blog' },
  ];
  readonly NAV_ICON = [
    {
      icon: faFacebook,
      link: 'https://www.facebook.com/nguyen.nhok.94043/?locale=vi_VN',
    },
    { icon: faInstagram, link: 'https://www.instagram.com/hien.nguyenxd/' },
    {
      icon: faLinkedin,
      link: 'https://www.linkedin.com/in/nguyen-hien-nguyen-607197241/',
    },
  ];
  readonly faRocket = faRocket;
  ngOnInit(): void {
    AOS.init({
      duration: 400,
      once: true,
    });
  }
}
