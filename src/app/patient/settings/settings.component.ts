import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators,} from '@angular/forms';
import { UserService } from './service/user.service';
import { BehaviorSubject,Observable } from 'rxjs';
import {User} from "../../patient/settings/models/User";
import{ProvinciaI,CantonI} from "./models/model.intercafe"
import { DataService } from './service/data.service';
import { AuthService } from '@core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers:[DataService]
})
export class SettingsComponent implements OnInit {
  public currentUser=this.userService.getDataUser(); 
 // public selectedProvincia:ProvinciaI={id:1,nombre:"San José"};
  //public provincias:ProvinciaI[]=this.data.getProvincias();
  //public cantones:CantonI[]=this.data.getCantones();
  passwordForm: FormGroup;
  userUpdateForm:FormGroup;
 
  constructor(private formBuilder: FormBuilder, private userService:UserService,private data: DataService, private auth:AuthService) {
    this.userUpdateForm = this.formBuilder.group({
      userName: new FormControl(userService.currentUserValue.name, {
        validators:[Validators.required]
      }),
      lastName: new FormControl("", {
        validators:[Validators.required]
      }),
        email: new FormControl("", {
        validators:[Validators.required]
      }),
      name: new FormControl("", {
        validators:[Validators.required]
      }),
      phone: new FormControl("", {
        validators:[Validators.required]
      }),
      canton: new FormControl("", {
        validators:[Validators.required]
      }),
      district: new FormControl("", {
        validators:[Validators.required]
      }),
      province: new FormControl("", {
        validators:[Validators.required]
      }),
      citizenId: new FormControl("", {
        validators:[Validators.required]
      }),

    });
  }
  ngOnInit() {
    this.userService.getDataUser().subscribe(
    (user: User) => {
      // Manejar los datos del usuario recibidos en 'user'
      console.log('Datos del usuario:', user);
      this.userUpdateForm.controls['email'].setValue(user.email);
      this.userUpdateForm.controls['canton'].setValue(user.canton);
      this.userUpdateForm.controls['district'].setValue(user.district);
      this.userUpdateForm.controls['province'].setValue(user.province);
      this.userUpdateForm.controls['lastName'].setValue(user.lastName);
      this.userUpdateForm.controls['name'].setValue(user.name);
      this.userUpdateForm.controls['phone'].setValue(user.phone);
      this.userUpdateForm.controls['userName'].setValue(user.userName);
    }, error => {
      // Manejar errores en caso de que ocurran
      console.error('Error al obtener datos del usuario:', error);
    });
    console.log("soy el id "+this.auth.currentUserValue.id)
}
  onSubmit(){
    if(this.userUpdateForm.valid){
      const user: User=new User({
        canton: this.userUpdateForm.controls['canton'].value,
        district:this.userUpdateForm.controls['district'].value,
        province :this.userUpdateForm.controls['province'].value,
        email: this.userUpdateForm.controls['email'].value,
        lastName: this.userUpdateForm.controls['lastName'].value,
        name: this.userUpdateForm.controls['name'].value,
        phone: this.userUpdateForm.controls['phone'].value,
        userName: this.userUpdateForm.controls['userName'].value
      })
      console.log(user+ " soy la modificacion ")
    }
  }
}
