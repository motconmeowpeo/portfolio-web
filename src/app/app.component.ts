import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountService } from '@core/services/count';
import { from, lastValueFrom, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  constructor(private countService: CountService, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.httpClient.get('https://api.db-ip.com/v2/free/self', {
      headers: new HttpHeaders({
        'origin': environment.currentUrl,
      })
    }).pipe(
      switchMap(({ ipAddress }: any) => this.countService.count(ipAddress))
    ).subscribe()
  }
  @ViewChild('cursor') cursorRef!: ElementRef<HTMLDivElement>;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.cursorRef) {
      this.cursorRef.nativeElement.style.left = `${event.pageX}px`;
      this.cursorRef.nativeElement.style.top = `${event.pageY}px`;
      this.cursorRef.nativeElement.style.display = `block`;
    }
  }
  @HostListener('document:scroll', ['$event'])
  onScroll(event: MouseEvent) {
    if (this.cursorRef) {
      this.cursorRef.nativeElement.style.left = `${event.pageX}px`;

      this.cursorRef.nativeElement.style.top = `${event.pageY}px`;
    }
  }

}
