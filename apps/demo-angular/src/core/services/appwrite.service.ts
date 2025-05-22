import { Injectable, signal } from '@angular/core';
import { AppwriteData } from '@workspace/nativescript-data';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  data: AppwriteData;
  messages = signal<{ message: string; createdAt: string }[]>([]);

  constructor() {
    this.data = new AppwriteData();
    this.data.dataUpdates = (data) => {
      this.messages.set([...this.messages(), ...data]);
    };
  }
}
