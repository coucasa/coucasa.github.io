import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ResizeableComponent } from '../resizeable/resizeable.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent extends ResizeableComponent {

  key: string = '';
  items: Item[] = [];

  constructor(el: ElementRef, router: Router) {
    super(el);
    this.key = router.url.substring(1);
    this.items = require("./" + this.key + ".json");
  }

  getTileWidth(): number {
    return 400;
  }

  getRowHeight(): number {
    return 300;
  }

}
