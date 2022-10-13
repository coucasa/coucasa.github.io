import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];

  constructor() {
    this.categories = require("./category.json");
  }

  getCategories() {
    return this.categories;
  }

}
