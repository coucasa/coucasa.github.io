import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  private el: HTMLElement;

  items: Item[] = [];
  cols: number = 1;
  gutter: number = 16;
  rowHeight: number = 250;

  constructor(el: ElementRef, router: Router) {
    this.el = el.nativeElement;
    if (router.url.length > 1) {
      this.items = require("." + router.url + ".json");
    }
  }

  ngOnInit(): void {
    this.resize();
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(): void {
    this.resize();
  }

  private resize(): void {
    this.cols = Math.max(1, Math.floor(this.el.offsetWidth / 600));
    this.gutter = 16 * this.cols;
  }

}
