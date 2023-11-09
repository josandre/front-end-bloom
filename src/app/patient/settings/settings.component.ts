import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, ValidatorFn,} from '@angular/forms';
import { UserService } from './service/user.service';
import {User} from "../../patient/settings/models/User";
import {Password} from "../../patient/settings/models/Password";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  passwordForm: FormGroup;
  userUpdateForm:FormGroup;
  password:Password;

  constructor(private formBuilder: FormBuilder, private userService:UserService,private snackBar: MatSnackBar) {
    this.initFormUser();
    this.initFormPass();

  }

  initFormUser(){
    this.userUpdateForm = this.formBuilder.group({
      userName: new FormControl("", {
        validators:[Validators.required]
      }),
      lastName: new FormControl("", {
        validators:[Validators.required]
      }),
        email: new FormControl({ value: '', disabled: true } , {
        validators:[Validators.required, Validators.email]
      }),
      name: new FormControl("", {
        validators:[Validators.required]
      }),
      phone: new FormControl("", {
        validators:[Validators.required]
      }),
      citizenId: new FormControl({ value: '', disabled: true } ,{
        validators:[Validators.required]
      }),
      address: new FormControl("", {
        validators:[Validators.required]
      }),
    });
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
        validators:[Validators.required,  this.validatePassword()]
      })
    });
  }

  ngOnInit() {
    this.userService.getDataUser().subscribe(
    (user: User) => {
      console.log('Datos del usuario:', user);
      this.userUpdateForm.controls['email'].setValue(user.email);
      this.userUpdateForm.controls['lastName'].setValue(user.lastName);
      this.userUpdateForm.controls['name'].setValue(user.name);
      this.userUpdateForm.controls['phone'].setValue(user.phone);
      this.userUpdateForm.controls['userName'].setValue(user.userName);
      this.userUpdateForm.controls['citizenId'].setValue(user.citizenId);
      this.userUpdateForm.controls['address'].setValue(user.address);
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
    if(this.userUpdateForm.valid){

      const user: User=new User({
        email: this.userUpdateForm.controls['email'].value,
        lastName: this.userUpdateForm.controls['lastName'].value,
        name: this.userUpdateForm.controls['name'].value,
        phone: this.userUpdateForm.controls['phone'].value,
        userName: this.userUpdateForm.controls['userName'].value,
        citizenId: this.userUpdateForm.controls['citizenId'].value,
        address: this.userUpdateForm.controls['address'].value,

      })

      this.userService.updateUser(user).subscribe((res) => {
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
      
      this.userService.updatePassword(password).subscribe((res) => {
        switch (res) {
          case 200:{
            this.openSnackBar("User updated", "Close");
            //this.passwordForm.reset();
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
