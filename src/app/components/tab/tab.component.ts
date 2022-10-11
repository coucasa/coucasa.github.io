import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface App {
  key: string,
  background?: string,
  logo: string,
  refer: boolean,
  register?: string,
  web: string,
  android: string,
  ios: string
}
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  apps: App[] = [];

  constructor(public translate: TranslateService, public platform: Platform) {}

}
