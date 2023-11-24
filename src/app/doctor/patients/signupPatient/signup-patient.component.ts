import { Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../service/Patient.service";
import {Patient} from "../model/Patient";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "@core";
import { Router} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-signup-patient',
  templateUrl: 'signup-patient.component.html',
  styleUrls: ['signup-patient.component.css'],
})
export class SignupPatientComponent implements OnInit{
  authForm!: FormGroup;
  hide = true;
  isLoading: boolean = false
  message: string = 'SIGN_UP_PATIENTS.MESSAGE'

  constructor(private router: Router, private formBuilder: FormBuilder, private patientService: PatientService,  private snackBar: MatSnackBar, private readonly authService: AuthService,private translate: TranslateService)  {}

  ngOnInit() {
    console.log(this.authService.currentUserValue.id)
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
      citizenId: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),
      address: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),

      email: new FormControl("", {
        validators:[Validators.required,  Validators.email, Validators.minLength(5)],
        updateOn: "submit"
      }),

      phone: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      }),

      password: ['', Validators.required],
    });
  }

  onSubmit(){
    this.isLoading = true

    if(this.authForm.valid){
      const patient : Patient = new Patient({
        citizenId : this.authForm.controls['citizenId'].value,
        email: this.authForm.controls['email'].value,
        lastName: this.authForm.controls['lastName'].value,
        name: this.authForm.controls['name'].value,
        password: this.authForm.controls['password'].value,
        userName : this.authForm.controls['username'].value,
        phone : this.authForm.controls['phone'].value,
        address : this.authForm.controls['address'].value })

      this.patientService.registerPatient(patient).subscribe((res) => {
        this.isLoading = false;
        switch (res) {
          case 200:{
            this.openSnackBar('SNACKBAR_PATIENT_SIGNUP.SUCCESS', 'SNACKBAR_PATIENT_SIGNUP.CLOSE')
            this.router.navigate(['/doctor/patients']);
            break;
          }
        }
      }, error => {
        this.isLoading = false;
            switch (error.error) {
              case 404:{
                this.openSnackBar('SNACKBAR_PATIENT_SIGNUP.USER_NOT_ADDED', 'SNACKBAR_PATIENT_SIGNUP.CLOSE' );
                break;
              }
            }
          })

    }
  }

  openSnackBar(message: string, action: string) {
    this.translate.get([message,action]).subscribe((translations: any) => {
    this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
    });
  }
}
