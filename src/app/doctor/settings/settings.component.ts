import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, ValidatorFn,} from '@angular/forms';
import { AuthService } from '@core';
import { DoctorService } from '../service/doctor.service';
import {Password} from "../../patient/settings/models/Password";
import {User} from "../../patient/settings/models/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Specialist} from "../model/Specialist";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  passwordForm: FormGroup;
  doctorUpdateForm:FormGroup;
  password:Password;
  userId: number | undefined
  constructor(private formBuilder: FormBuilder, private doctorService:DoctorService , private auth:AuthService,private snackBar: MatSnackBar) {
    this.initFormUser();
    this.initFormPass();

  }
  initFormUser(){
    this.doctorUpdateForm = this.formBuilder.group({
        userName: new FormControl("", {
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
        medicalId: new FormControl({ value: '', disabled: true }, {
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
        email: new FormControl({ value: '', disabled: true }, {
          validators:[Validators.required,  Validators.email, Validators.minLength(5)],
          updateOn: "submit"
        })
      })
  }
  initFormPass(){
    this.passwordForm = this.formBuilder.group({
      currentPassword: new FormControl("", {
        validators:[Validators.required]
      }),
      newPassword: new FormControl("", {
        validators:[Validators.required]
      }),
        confirmPassword: new FormControl("", {
        validators:[Validators.required, this.validatePassword()]
      })
    });
  }
  ngOnInit() {
    this.doctorService.getDataUser().subscribe(
    (user: Specialist) => {
      console.log('Datos del usuario:', user);
      this.userId = user.user?.id;
      this.doctorUpdateForm.controls['college'].setValue(user.college);
      this.doctorUpdateForm.controls['location'].setValue(user.location);
      this.doctorUpdateForm.controls['medicalId'].setValue(user.medicalId);
      this.doctorUpdateForm.controls['speciality'].setValue(user.speciality);
      this.doctorUpdateForm.controls['name'].setValue(user.user?.name);
      this.doctorUpdateForm.controls['email'].setValue(user.user?.email);
      this.doctorUpdateForm.controls['lastName'].setValue(user.user?.lastName);
      this.doctorUpdateForm.controls['userName'].setValue(user.user?.userName);
    }, error => {
      console.error('Error al obtener datos del usuario:', error);
    });

}

  validatePassword(): ValidatorFn {
    return (): { [key: string]: boolean } | null => {
      if(!this.passwordForm) {
        return null;
      }

      const password = this.passwordForm.controls['newPassword'].value;
      const passwordConfirmation = this.passwordForm.controls['confirmPassword'].value;

      if(password === passwordConfirmation){
        return null;
      }

      return {passwordMatch: true}
    }
  }

  onSubmit(){
    
    if(this.doctorUpdateForm.valid){
      const doc: Specialist=new Specialist({
          college : this.doctorUpdateForm.controls['college'].value,
          location: this.doctorUpdateForm.controls['location'].value,
          medicalId: this.doctorUpdateForm.controls['medicalId'].value,
          speciality: this.doctorUpdateForm.controls['speciality'].value,
          user: new User({
            email: this.doctorUpdateForm.controls['email'].value,
            lastName: this.doctorUpdateForm.controls['lastName'].value,
            name: this.doctorUpdateForm.controls['name'].value,
            userName : this.doctorUpdateForm.controls['userName'].value })
        }
      )


      this.doctorService.updateDoctor(doc).subscribe((res) => {
        this.openSnackBar("User updated", "Close");
        switch (res) {

          case 200:{
            this.openSnackBar("User updated", "Close");
            break;
          }
        }
      }, error => {
          this.openSnackBar("The user was not updated", "Close" );

          })
  }
  }
  onSubmitPassword(){
    if(this.passwordForm.valid){
      const password :Password=new Password({
        currentPassword: this.passwordForm.controls['currentPassword'].value,
        newPassword:this.passwordForm.controls['newPassword'].value
      })
      this.doctorService.updatePassword(password, this.userId).subscribe((res) => {
        switch (res) {
          case 200:{
            this.openSnackBar("User updated", "Close");
            break;
          }
        }
      }, error => {
        switch (error.error) {
          case 404:{
            this.openSnackBar("Current password does not match", "Close" );
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
