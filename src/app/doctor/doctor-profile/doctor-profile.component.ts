import {Component, OnInit} from '@angular/core';
import {Specialist} from "./models/Specialist";
import {DoctorService} from "./services/doctor-profile.services";
import {UploadFileService} from "../../global/upload-file/upload-file.service";
import {AuthService} from "@core";
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Password} from "./models/Password";
import {User} from "./models/User";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent implements OnInit{
  specialist : Specialist ;
  loading : boolean = false;
  selectedFiles: FileList | null | undefined;
  currentFileUpload: File | null | undefined;
  progress: { percentage: number } = { percentage: 0 };
  file:string;
  uploadingPhoto:boolean = false;
  passwordForm: FormGroup;
  doctorUpdateForm:FormGroup;
  password:Password;
  userId: number | undefined
  isLoadingPassword: boolean = false;
  isLoadingUserUpdating: boolean = false;
  message: string = 'PROFILES.MESSAGE'

  constructor(private readonly doctorProfileService: DoctorService, private uploadService: UploadFileService, private readonly authService: AuthService,
  private formBuilder: FormBuilder, private snackBar: MatSnackBar,
  private translate: TranslateService
  ) {
    this.initFormUser();
    this.initFormPass();
  }

  ngOnInit(): void {
    this.loading = true
    this.doctorProfileService.getDataUser().subscribe((specialist) => {

      this.specialist = specialist;
      this.loading = false;
      this.userId = specialist.user?.id;
      this.doctorUpdateForm.controls['college'].setValue(specialist.college);
      this.doctorUpdateForm.controls['location'].setValue(specialist.location);
      this.doctorUpdateForm.controls['medicalId'].setValue(specialist.medicalId);
      this.doctorUpdateForm.controls['speciality'].setValue(specialist.speciality);
      this.doctorUpdateForm.controls['name'].setValue(specialist.user?.name);
      this.doctorUpdateForm.controls['email'].setValue(specialist.user?.email);
      this.doctorUpdateForm.controls['lastName'].setValue(specialist.user?.lastName);
      this.doctorUpdateForm.controls['userName'].setValue(specialist.user?.userName);
      this.doctorUpdateForm.controls['phone'].setValue(specialist.user?.phone);

    }, (error) => {
      this.loading = false
      this.openSnackBar('PROFILE.SNACKBAR.GET_USER.ERROR','PROFILE.SNACKBAR.ACTIONS.CLOSE')
      console.error('Error al obtener datos del usuario:', error);
    })

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
      phone: new FormControl("",{
        validators: [Validators.required],
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
    this.isLoadingUserUpdating = true;

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
            userName : this.doctorUpdateForm.controls['userName'].value,
            phone: this.doctorUpdateForm.controls['phone'].value,
          }),

        }
      )


      this.doctorProfileService.updateDoctor(doc).subscribe((res) => {
        this.isLoadingUserUpdating = false;
        this.openSnackBar('PROFILE.SNACKBAR.UPDATE_USER.SUCCESS','PROFILE.SNACKBAR.ACTIONS.CLOSE');
        switch (res) {
          case 200:{
            //this.openSnackBar('PROFILE.SNACKBAR.UPDATE_USER.SUCCESS','PROFILE.SNACKBAR.ACTIONS.CLOSE');
            break;
          }
        }
      }, error => {
        this.isLoadingUserUpdating = false;
        this.openSnackBar('PROFILE.SNACKBAR.UPDATE_USER.ERROR', 'PROFILE.SNACKBAR.ACTIONS.CLOSE' );
      })
    }
  }

  onSubmitPassword(){
    this.isLoadingPassword = true;
    if(this.passwordForm.valid){
      const password :Password=new Password({
        currentPassword: this.passwordForm.controls['currentPassword'].value,
        newPassword:this.passwordForm.controls['newPassword'].value
      })

      this.resetPassControl('currentPassword')
      this.resetPassControl('newPassword')
      this.resetPassControl('confirmPassword')

      this.doctorProfileService.updatePassword(password, this.userId).subscribe((res) => {
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

  private resetPassControl(controlName: string): void {
    const control = this.passwordForm.controls[controlName]
    control.setValue('')
    control.markAsPristine()
    control.setErrors(null)
    control.markAsUntouched()
  }

}
