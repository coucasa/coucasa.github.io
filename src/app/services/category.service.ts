import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [{ key: 'home', link: '', icon: 'home', color: '' },
  { key: 'store', link: 'store', icon: 'storefront', color: 'LightCyan' },
  { key: 'cashback', link: 'cashback', icon: 'percent', color: 'PowderBlue' },
  { key: 'loyalty', link: 'loyalty', icon: 'loyalty', color: 'LightBlue' },
  { key: 'test', link: 'test', icon: 'science', color: 'LightCyan' },
  { key: 'sample', link: 'sample', icon: 'auto_awesome', color: 'PowderBlue' },
  { key: 'survey', link: 'survey', icon: 'poll', color: 'LightBlue' },
  { key: 'sport', link: 'sport', icon: 'directions_run', color: 'LightCyan' }
  ];

  getCategories() {
    return this.categories;
  }

}
