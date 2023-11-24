import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Speciality} from "./models/Speciality";
import {Specialist} from "./models/Specialist";
import {SpecialistService} from "./services/Specialist.service";
import {User} from "./models/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm!: FormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  specialist: Speciality[] = [
    {value: 'therapist', viewValue:  'psychiatrist'},
    {value: 'psychology', viewValue: 'psychology'},
  ];
  isLoading: boolean = false;
  currentLang: string;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: SpecialistService, private snackBar: MatSnackBar,private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
  }


  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      lastName: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      name: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      medicalId: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      speciality: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      college: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      location: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      email: new FormControl("", {
        validators:[Validators.required,  Validators.email, Validators.minLength(5)],
        updateOn: "submit"
      }),
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.authForm.valid){
      this.isLoading = true;

      const specialist : Specialist = new Specialist({
          college : this.authForm.controls['college'].value,
          location: this.authForm.controls['location'].value,
          medicalId: this.authForm.controls['medicalId'].value,
          speciality: this.authForm.controls['speciality'].value,
          user: new User({
            email: this.authForm.controls['email'].value,
            lastName: this.authForm.controls['lastName'].value,
            name: this.authForm.controls['name'].value,
            password: this.authForm.controls['password'].value,
            userName : this.authForm.controls['username'].value })
        }
      )

      this.userService.doctorsRegister(specialist).subscribe((res) => {
        switch (res){
          case 200:{
            this.openSnackBar('SNACKBAR_SIGNUP.SUCCESS', 'SNACKBAR_SIGNUP.CLOSE' );
            this.router.navigate(['authentication/signin']);
            break;
          }
        }

        this.isLoading = false;

      }, error => {
        switch (error.error) {
          case 409:{
            this.openSnackBar('SNACKBAR_SIGNUP.EMAIL_REGISTRED', 'SNACKBAR_SIGNUP.CLOSE' );
            break;

          }

          case 404:{
            this.openSnackBar('SNACKBAR_SIGNUP.EMAIL_REGISTRED', "Close" );
            break;
          }
        }

        this.isLoading = false;
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.translate.get([message,action]).subscribe((translations: any) => {
    this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
    });
  }
  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  isLanguageActive(lang: string): boolean {
    return this.currentLang === lang;
  }
}
