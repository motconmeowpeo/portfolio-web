import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountService } from '@core/services/count';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  constructor(private countService: CountService) { }
  ngOnInit(): void { this.countService.count().subscribe() }
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
