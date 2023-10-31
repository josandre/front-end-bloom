import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {AuthService, Role} from "@core";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  authForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.authForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    console.log(this.authForm.valid)

    if(this.authForm.valid){
      this.authService.login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            const role = res.role;

            if (role === Role.All || role === Role.Admin) {
              this.router.navigate(['/admin/dashboard/main']);
            } else if (role === Role.Doctor) {
              this.router.navigate(['/doctor/dashboard']);
            } else if (role === Role.Patient) {
              this.router.navigate(['/patient/dashboard']);
            } else {
              this.router.navigate(['/authentication/signin']);
            }
            this.loading = false;
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        })


    }else{
      // this.error = 'Username and Password not valid !';
    }
  }
}
