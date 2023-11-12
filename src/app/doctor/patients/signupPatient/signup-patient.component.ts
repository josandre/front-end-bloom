import { Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../service/Patient.service";
import {Patient} from "../model/Patient";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "@core";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-signup-patient',
  templateUrl: 'signup-patient.component.html',
  styleUrls: ['signup-patient.component.css'],
})
export class SignupPatientComponent implements OnInit{
  authForm!: FormGroup;
  hide = true;
  chide = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private patientService: PatientService,  private snackBar: MatSnackBar, private readonly authService: AuthService)  {
  }

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
    console.log(this.authForm.valid, 'valid')

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

      console.log(patient)

      this.patientService.registerPatient(patient).subscribe((res) => {
        switch (res) {
          case 200:{
            this.openSnackBar("Patient added", "Close")
            this.router.navigate(['/doctor/patients']);
            break;
          }
        }
      }, error => {
            switch (error.error) {
              case 404:{
                this.openSnackBar("The patient was not added", "Close" );
                break;
              }
            }
          })

    }
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }

}
