import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateMockService {

  constructor() { }

  public get(key: any): any {
    return of(key);
  }

}
