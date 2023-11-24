import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CountService } from '@core/services/count';
import { of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { faChevronLeft, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  count$ = this.countService.count$;
  readonly faChevronUp = faChevronUp;
  isStandingTop = true;
  constructor(
    private countService: CountService,
    private httpClient: HttpClient,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.countService.getCount().subscribe();
    const cookieArr = document.cookie
      .split('; ')
      .find((item) => item === 'visited');
    if (!cookieArr) {
      document.cookie = 'visited';
      this.httpClient
        .get('https://api.db-ip.com/v2/free/self', {
          headers: new HttpHeaders({
            origin: environment.currentUrl,
          }),
        })
        .pipe(
          switchMap((value) => {
            return this.countService.count(value);
          })
        )
        .subscribe();
    }
  }

  @HostListener('document:scroll', ['$event'])
  onScroll(event: MouseEvent) {
    this.isStandingTop = !document.documentElement.scrollTop
  }

  gotoSendMessage() {
    this.router.navigateByUrl('/home?goto=true');
  }

  scrollToTop(): void {
    // scroll to the top of the body
    return document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }
}
