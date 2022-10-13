import { Component, ElementRef, HostListener } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private el: HTMLElement;

  cols: number = 1;
  gutter: number = 16;
  rowHeight: number = 200;

  categories: Category[] = [];

  constructor(el: ElementRef, categoryService: CategoryService) {
    this.el = el.nativeElement;
    this.categories = categoryService.getCategories().slice(1);
  }

  ngOnInit(): void {
    this.resize();
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(): void {
    this.resize();
  }

  private resize(): void {
    this.cols = 1 + Math.floor(this.el.offsetWidth / 800);
    this.gutter = 16 * this.cols;
  }

}
