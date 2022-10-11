import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';

export interface Category {
  key: string,
  link: string,
  icon: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme: Observable<boolean>;
  categories: Category[] = [{ key: 'home', link: '', icon: 'home' },
  { key: 'store', link: 'store', icon: 'storefront' },
  { key: 'cashback', link: 'cashback', icon: 'percent' },
  { key: 'loyalty', link: 'loyalty', icon: 'loyalty' },
  { key: 'test', link: 'test', icon: 'science' },
  { key: 'sample', link: 'sample', icon: 'auto_awesome' },
  { key: 'survey', link: 'survey', icon: 'poll' },
  { key: 'sport', link: 'sport', icon: 'directions_run' }
  ];

  constructor(public translate: TranslateService, private themeService: ThemeService) {
    translate.addLangs(['de']);
    translate.setDefaultLang('de');
    translate.use('de');
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}