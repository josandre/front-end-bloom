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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: SpecialistService, private snackBar: MatSnackBar) {}

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
      const specialist : Specialist = new Specialist({
          college : this.authForm.controls['college'].value,
          location: this.authForm.controls['location'].value,
          medicalId: this.authForm.controls['medicalId'].value,
          speciality: this.authForm.controls['medicalId'].value,
          user: new User({
            email: this.authForm.controls['email'].value,
            lastName: this.authForm.controls['lastName'].value,
            name: this.authForm.controls['name'].value,
            password: this.authForm.controls['password'].value,
            userName : this.authForm.controls['username'].value })
        }
      )

      this.userService.doctorsRegister(specialist).subscribe((res) => {
        console.log(res)
        switch (res){

          case 200:{
            this.openSnackBar("User added", "Close" );
            this.router.navigate(['authentication/signin']);
            break;
          }
        }

      }, error => {
        switch (error.error) {
          case 409:{
            this.openSnackBar("Your email is already registered", "Close" );
            break;

          }

          case 404:{
            this.openSnackBar("The user is not acceptable", "Close" );
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
