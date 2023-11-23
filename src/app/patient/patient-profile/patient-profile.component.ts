import {Component, OnInit} from '@angular/core';
import {UploadFileService} from "../../global/upload-file/upload-file.service";
import {AuthService} from "@core";
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Password} from "../patient-profile/models/Password";
import {UserService} from "./services/user.service";
import {User} from "./models/User";
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-patient-profile',
  templateUrl: 'patient-profile.component.html',
  styleUrls: ['patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit{

  user: User
  loading : boolean = true;
  selectedFiles: FileList | null | undefined;
  currentFileUpload: File | null | undefined;
  progress: { percentage: number } = { percentage: 0 };
  file:string;
  uploadingPhoto:boolean = false;
  passwordForm: FormGroup;
  userUpdateForm:FormGroup;
  password:Password;
  userId: number | undefined
  isLoadingPassword: boolean = false;
  isLoadingUserUpdating: boolean = false;
  message: string = 'PROFILES.MESSAGE'

  constructor(private readonly userService: UserService, private uploadService: UploadFileService, private readonly authService: AuthService,
  private formBuilder: FormBuilder, private snackBar: MatSnackBar,private translate: TranslateService) {
    this.initFormUser();
    this.initFormPass();
  }

  ngOnInit(): void {
    this.userService.getDataUser().subscribe(

      (user: User) => {
        this.user = user;
        this.loading = false;
        this.userUpdateForm.controls['email'].setValue(user.email);
        this.userUpdateForm.controls['lastName'].setValue(user.lastName);
        this.userUpdateForm.controls['name'].setValue(user.name);
        this.userUpdateForm.controls['phone'].setValue(user.phone);
        this.userUpdateForm.controls['userName'].setValue(user.userName);
        this.userUpdateForm.controls['citizenId'].setValue(user.citizenId);
        this.userUpdateForm.controls['address'].setValue(user.address);
      }, error => {
        this.openSnackBar('PROFILE.SNACKBAR.GET_USER.ERROR','PROFILE.SNACKBAR.ACTIONS.CLOSE')
        console.error('Error al obtener datos del usuario:', error);
      });

  }

  initFormUser(){
    this.userUpdateForm = this.formBuilder.group({
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
      phone: new FormControl("",{
        validators: [Validators.required],
        updateOn: "submit"
      }),
      email: new FormControl({ value: '', disabled: true }, {
        validators:[Validators.required,  Validators.email, Validators.minLength(5)],
        updateOn: "submit"
      }),
      citizenId: new FormControl({ value: '', disabled: true } ,{
        validators:[Validators.required]
      }),
      address: new FormControl("", {
        validators:[Validators.required]
      }),
    })
  }

  initFormPass(){

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl("", {
        validators:[Validators.required],
        updateOn: 'submit'
      }),
      newPassword: new FormControl("", {
        validators:[Validators.required],
        updateOn: 'submit'
      }),
      confirmPassword: new FormControl("", {
        validators:[Validators.required, this.validatePassword()],
        updateOn: 'submit'
      })
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

  photoManager(){
    return this.uploadService.getPhoto('../../../assets/images/user.png');
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles?.item(0);

    this.uploadingPhoto = true;
    if(this.currentFileUpload) {
      this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        this.uploadingPhoto = false;
        this.authService.currentUserValue.photo = this.selectedFiles?.item(0)?.name;
        this.selectedFiles = undefined;
      });
    }
  }


  onSubmit(){
    if(this.userUpdateForm.valid){
      this.isLoadingUserUpdating = true;

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
        this.isLoadingUserUpdating = false;
        this.user = res.objectResponse;

        switch (res.statusCode) {
          case 200:{
            this.openSnackBar('PROFILE.SNACKBAR.UPDATE_USER.SUCCESS','PROFILE.SNACKBAR.ACTIONS.CLOSE');
            break;
          }
        }
      }, error => {
        this.isLoadingUserUpdating = false;
        this.openSnackBar('PROFILE.SNACKBAR.UPDATE_USER.ERROR', 'PROFILE.SNACKBAR.ACTIONS.CLOSE' );

      })
    }
  }

  private resetPassControl(controlName: string): void {
    const control = this.passwordForm.controls[controlName]
    control.setValue('')
    control.markAsPristine()
    control.setErrors(null)
    control.markAsUntouched()
  }

  onSubmitPassword(){
    console.log(this.passwordForm)

    if(this.passwordForm.valid){
      const password :Password = new Password({
        currentPassword: this.passwordForm.controls['currentPassword'].value,
        newPassword:this.passwordForm.controls['newPassword'].value
      })

      this.resetPassControl('currentPassword')
      this.resetPassControl('newPassword')
      this.resetPassControl('confirmPassword')
      this.isLoadingPassword = true;


       this.userService.updatePassword(password).subscribe((res) => {
         this.isLoadingPassword = false;

         switch (res) {
           case 200:{
             this.openSnackBar('PROFILE.SNACKBAR.UPDATE_PASSWORD.SUCCESS', 'PROFILE.SNACKBAR.ACTIONS.CLOSE');
             break;
           }
         }


       }, error => {
         this.isLoadingPassword = false;

         switch (error.error) {
           case 404:{
             this.openSnackBar('PROFILE.SNACKBAR.UPDATE_PASSWORD.ERROR', 'PROFILE.SNACKBAR.ACTIONS.CLOSE');
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
