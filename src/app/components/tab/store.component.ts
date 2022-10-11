import { Platform } from '@angular/cdk/platform';
import { Component, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-store',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class StoreComponent extends TabComponent {
  constructor(translate: TranslateService, platform: Platform) {
    super(translate, platform);
    this.apps = [{
      key: 'rewe',
      logo: 'rewe_logo.svg',
      refer: false,
      web: 'https://www.rewe.de',
      android: 'https://app.adjust.com/yioykc1?deep_link=rewe%3A%2F%2F&label=ONS',
      ios: 'https://app.adjust.com/jsr?url=https%3A%2F%2Fj89v.adj.st%3Fadj_t%3D7ddpi19%26adj_label%3DONS'
    }];
  }

}
