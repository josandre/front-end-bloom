import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {AuthService, Role} from "@core";
import { TranslateService } from '@ngx-translate/core';


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
  currentLang: string;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService,private translate: TranslateService) {
    this.currentLang = 'en';
  }

  ngOnInit() {
    this.translate.use(this.currentLang);
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
            this.error = 'LOGIN.ERROR';
            this.submitted = false;
            this.loading = false;
          }
        })
    }
  }
  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  isLanguageActive(lang: string): boolean {
    return this.currentLang === lang;
  }
}
