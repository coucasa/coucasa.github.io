import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export abstract class ResizeableComponent implements OnInit {

  private el: HTMLElement;

  cols: number = 1;
  gutter: number = 16;
  margin: number = 0;
  rowHeight: number;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.rowHeight = this.getRowHeight();
  }

  ngOnInit(): void {
    this.resize();
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(): void {
    this.resize();
  }

  private resize(): void {
    this.cols = Math.max(1, Math.floor(this.el.offsetWidth / this.getTileWidth()));
    if (this.el.offsetWidth <= 600) {
      this.margin = 0;
    } else {
      this.margin = 16;
    }
  }

  abstract getTileWidth(): number;

  abstract getRowHeight(): number;

}
