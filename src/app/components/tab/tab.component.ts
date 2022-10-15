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

  items: Item[] = [];

  constructor(el: ElementRef, router: Router) {
    super(el);
    this.items = require("." + router.url + ".json");
  }

}
