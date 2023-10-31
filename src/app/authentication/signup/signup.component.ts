import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Speciality} from "./models/Speciality";
import {Specialist} from "./models/Specialist";
import {UserService} from "./services/User.service";
import {User} from "./models/User";
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
    {value: 'therapist', viewValue: 'therapist'},
    {value: 'psychology', viewValue: 'psychology'},
  ];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) {}

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

    console.log(this.authForm.valid);
    console.log(this.authForm.value);
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
        console.log("user added")


      }, () => {
        console.log("bad")
      })
    }

    // if (this.authForm.invalid) {
    //   return;
    // } else {
    //   this.router.navigate(['/admin/dashboard/main']);
    // }
  }
}
