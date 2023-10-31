import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, map, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements AfterViewChecked {
  @ViewChild('menu') menuRef!: ElementRef<HTMLElement>;
  @ViewChild('dropdown') dropdownRef!: ElementRef<HTMLElement>;

  @Input() position: 'left' | 'right' | 'full' = 'left';
  @Input() zIndex!: number;
  @Input() isBlocked = false;
  @Input() flexibleDrop = true;

  isMenuShown = false;
  dropPositionClasses = '';

  get positionClasses(): string {
    switch (this.position) {
      case 'left':
        return 'left-0';

      case 'right':
        return 'right-0';

      case 'full':
        return 'left-0 right-0';
    }
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    //Check drop position
    const heightMenu = this.menuRef?.nativeElement.clientHeight;
    const heightDropdown = this.dropdownRef?.nativeElement.clientHeight;
    const YAxisMenu = this.menuRef?.nativeElement?.getBoundingClientRect().y;
    const YAxisWindow = window.innerHeight;

    //Menu + Dropdown element > screen  ====> Drop up
    if (
      this.flexibleDrop &&
      YAxisMenu + heightMenu + heightDropdown > YAxisWindow - heightDropdown
    ) {
      this.dropPositionClasses = 'bottom-full mb-1';
      this.cd.detectChanges();
      return;
    }

    //Drop down
    this.dropPositionClasses = 'top-full mt-1';
    this.cd.detectChanges();
  }

  scrollIntoView(index: number) {
    const scrollSpace = this.dropdownRef?.nativeElement
      ?.firstChild as HTMLElement;

    const heightDropdown = this.dropdownRef?.nativeElement?.clientHeight;

    const childHeight = (scrollSpace?.firstChild as HTMLElement)?.clientHeight;
    scrollSpace?.scroll({
      top: childHeight * index - heightDropdown / 2,
      behavior: 'smooth',
    });
  }

  openMenu(e?: Event) {
    e?.stopPropagation();

    if (this.isBlocked) return;

    this.isMenuShown = !this.isMenuShown;
    this.handleClickOutside();
  }

  private handleClickOutside() {
    const menuEl = this.menuRef?.nativeElement;

    fromEvent(document, 'mousedown')
      .pipe(
        takeWhile(() => this.isMenuShown),
        map((event) => event.target as HTMLElement),
        tap((target) => {
          this.isMenuShown = menuEl?.contains(target);
        })
      )
      .subscribe();
  }
}
