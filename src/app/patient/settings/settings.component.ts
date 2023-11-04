import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,} from '@angular/forms';
import { UserService } from './service/user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
 
  userUpdateForm=this.formBuilder.group({
    //los campos
    email:['prueba'],
      })
  constructor(private formBuilder: FormBuilder, private userService:UserService) {
  }
  ngOnInit() {
  
    
  }

}
