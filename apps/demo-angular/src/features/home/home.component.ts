import { Component, NO_ERRORS_SCHEMA, inject, signal } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { Dialogs, Page, TextField } from '@nativescript/core';
import { AppwriteService } from '../../core/services/appwrite.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {
  appWriteService = inject(AppwriteService);
  formBuilder = inject(FormBuilder);
  page = inject(Page);
  isAuthenticated = signal(false);
  loggingIn = signal(false);
  adding = signal(false);
  currentMessage = signal('');
  formGroup: FormGroup;
  textField: TextField;

  constructor() {
    if (__ANDROID__) {
      this.page.actionBarHidden = true;
    }

    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
    if (!this.formGroup.valid) {
      let message = '';
      if (this.formGroup.get('email')?.errors?.required) {
        message += 'Email is required.\n';
      }
      if (this.formGroup.get('password')?.errors?.required) {
        message += 'Password is required.\n';
      }
      Dialogs.alert({
        title: 'Input Required',
        message,
        okButtonText: 'OK',
      });
      return;
    }
    this.loggingIn.set(true);
    const values = this.formGroup.value;
    const isAuth = await this.appWriteService.data.login(
      values.email.toLowerCase(),
      values.password.toLowerCase()
    );
    this.isAuthenticated.set(isAuth);
    this.loggingIn.set(false);
  }

  onTextChange(event: any) {
    this.textField = event.object as TextField;
    const value = this.textField.text;
    this.currentMessage.set(value);
  }

  async addMessage() {
    if (!this.currentMessage()) {
      return;
    }
    this.adding.set(true);
    const result = await this.appWriteService.data.createDocument({
      message: this.currentMessage(),
      createdAt: new Date().toISOString(),
    });
    this.currentMessage.set('');
    this.textField.text = '';
    this.adding.set(false);
  }
}
