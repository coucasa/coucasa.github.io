import { Platform } from '@angular/cdk/platform';
import { Component, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-store',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class SportComponent extends TabComponent {
  constructor(translate: TranslateService, platform: Platform) {
    super(translate, platform);
    this.apps = [{
      key: 'sweatcoin',
      background: '#5f3aae',
      logo: 'sweatcoin_logo.png',
      refer: false,
      web: 'https://sweatco.in/i/ngmg_82',
      android: 'https://sweatco.in/i/ngmg_82',
      ios: 'https://sweatco.in/i/ngmg_82'
    }, {
      key: 'weward',
      logo: 'weward_logo.png',
      refer: true,
      web: 'https://weward.page.link/invite',
      android: 'https://play.google.com/store/apps/details?id=com.weward',
      ios: 'https://itunes.apple.com/fr/app/weward-gagnez-en-marchant/id1454213029?l=en&mt=8&ign-mpt=uo2'
    }];
  }

}
