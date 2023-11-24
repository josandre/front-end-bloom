import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core'
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
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
          this.snackBar.open("All set! We sent an email with your new details.", 'Done', {verticalPosition: 'top', horizontalPosition: 'end'})
        },
        error: () => {
          this.snackBar.open("There was an issue resetting your password. Please contact support-bloomapp@gmail.com for more information.", 'Done', {verticalPosition: 'top', horizontalPosition: 'end'})
        }
      })
  }
}
