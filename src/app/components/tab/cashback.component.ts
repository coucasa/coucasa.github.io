import { Platform } from '@angular/cdk/platform';
import { Component, } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-cashback',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class CashbackComponent extends TabComponent {
  constructor(platform: Platform) {
    super(platform);
    this.apps = [{
      key: 'couponplatz',
      logo: 'couponplatz_logo.svg',
      refer: false,
      web: 'https://smhaggle.com',
      android: '',
      ios: ''
    }, {
      key: 'marktguru',
      background: '#08aae7',
      logo: 'marktguru_logo.svg',
      refer: true,
      register: 'https://marktguru.de/einladen/friend2o1i066',
      web: 'https://marktguru.de',
      android: 'https://app.adjust.com/8drzqq8?engagement_type=fallback_click&fallback=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.marktguru.mg2.de',
      ios: 'https://app.adjust.com/a6fkkr8?engagement_type=fallback_click&fallback=https%3A%2F%2Fitunes.apple.com%2Fapp%2Fid1064025602%3Fmt%3D8'
    }, {
      key: 'scondoo',
      logo: 'scondoo_logo.svg',
      refer: false,
      web: 'https://scondoo.de/',
      android: '',
      ios: ''
    }, {
      key: 'smhaggle',
      logo: 'smhaggle_logo.svg',
      refer: false,
      web: 'https://smhaggle.com',
      android: '',
      ios: ''
    }];
  }

}
