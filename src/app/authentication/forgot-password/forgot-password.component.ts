import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  currentLang: string;
  constructor(
    private formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = 'en';
  }

  ngOnInit() {
    this.translate.use(this.currentLang);
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }

    const userEmail = this.authForm.get('email')?.value

    this.authService.changePassword(userEmail)
      .subscribe({
        next: () => {
          this.openSnackBar('SNACKBAR_FORGOT_PASSWORD.SUCCESS', 'SNACKBAR_FORGOT_PASSWORD.DONE')
        },
        error: () => {
          this.openSnackBar("SNACKBAR_FORGOT_PASSWORD.ERROR", 'SNACKBAR_FORGOT_PASSWORD.DONE')
        }
      })
  }
  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  isLanguageActive(lang: string): boolean {
    return this.currentLang === lang;
  }
  openSnackBar(message: string, action: string) {
    this.translate.get([message,action]).subscribe((translations: any) => {
    this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
    });
  }
  
}
