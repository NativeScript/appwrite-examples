import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';
import { Page, TextField } from '@nativescript/core';
import { ItemService, Item } from '../../core/services/item.service';
import { AppwriteService } from '../../core/services/appwrite.service';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {
  appWriteService = inject(AppwriteService);
  itemService = inject(ItemService);
  page = inject(Page);

  constructor() {
    if (__ANDROID__) {
      this.page.actionBarHidden = true;
    }
  }

  onTextChange(args: any) {
    const textField = args.object as TextField;
    const value = textField.text;
    console.log('Text changed:', value);
  }
}
