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
import * as AOS from 'aos';
import { ButtonComponent } from '@core/ui';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { NAV_ICON, NAV_MENU } from '@core/constants';
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
  readonly NAV_MENU = NAV_MENU;
  readonly NAV_ICON = NAV_ICON;
  readonly faRocket = faRocket;

  ngOnInit(): void {
    AOS.init({
      duration: 400,
      once: true,
    });
  }
}
