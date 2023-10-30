import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Speciality} from "./models/Speciality";
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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      medicalId: ['', Validators.required],
      speciality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)],
      ],


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

    if (this.authForm.invalid) {
      return;
    } else {
      this.router.navigate(['/admin/dashboard/main']);
    }
  }
}
