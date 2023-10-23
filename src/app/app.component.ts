import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  ngOnInit(): void {}
  @ViewChild('cursor') cursorRef!: ElementRef<HTMLDivElement>;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any) {
    this.cursorRef.nativeElement.style.left = `${event.pageX}px`;
    this.cursorRef.nativeElement.style.top = `${event.pageY}px`;
    this.cursorRef.nativeElement.style.display = `block`;
  }
  @HostListener('document:scroll', ['$event'])
  onScroll(event: any) {
    this.cursorRef.nativeElement.style.left = `${event.pageX}px`;
    this.cursorRef.nativeElement.style.top = `${event.pageY}px`;

  }
}
