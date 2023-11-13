import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '@core';
import { User } from '../models/User';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent {
  data:User;
  loading:Boolean=true
  constructor(private doctorService:UserService , private auth:AuthService) {
    // constructor code
  }
  ngOnInit() {
    this.doctorService.getDataUser().subscribe(
    (user: User) => {
      console.log('Datos del usuario:', user);
      this.data=user;
      this.loading=false;

    
    }, error => {
      console.error('Error al obtener datos del usuario:', error);
    });

}
}