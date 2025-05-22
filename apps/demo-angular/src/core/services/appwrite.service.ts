import { Injectable } from '@angular/core';
import { AppwriteData } from '@workspace/nativescript-data';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  data: AppwriteData;

  constructor() {
    this.data = new AppwriteData();
  }
}
