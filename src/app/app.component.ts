import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme: Observable<boolean>;
  categories: Category[] = [];

  constructor(public translate: TranslateService, private themeService: ThemeService, private categoryService: CategoryService) {
    translate.addLangs(['de']);
    translate.setDefaultLang('de');
    translate.use('de');
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.categories = categoryService.getCategories();
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}