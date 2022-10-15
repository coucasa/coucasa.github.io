import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class ResizeableComponent implements OnInit {

  private el: HTMLElement;

  cols: number = 1;
  gutter: number = 16;
  margin: number = 0;
  rowHeight: number = 300;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit(): void {
    this.resize();
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(): void {
    this.resize();
  }

  private resize(): void {
    this.cols = Math.max(1, Math.floor(this.el.offsetWidth / 400));
    if (this.el.offsetWidth <= 600) {
      this.gutter = 16;
      this.margin = 0;
    } else {
      this.gutter = 32;
      this.margin = 16;
    }
  }

}
