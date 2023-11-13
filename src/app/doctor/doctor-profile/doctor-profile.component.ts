import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { AuthService } from '@core';
import { Specialist } from '../model/Specialist';
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent {
  data:Specialist;
  loading:Boolean=true
  constructor(private doctorService:DoctorService , private auth:AuthService) {
    // constructor code
  }
  ngOnInit() {
    this.doctorService.getDataUser().subscribe(
    (user: Specialist) => {
      console.log('Datos del usuario:', user);
      this.data=user;
      console.log(this.data.college)
      console.log(this.data.user?.name)
      this.loading=false;

    
    }, error => {
      console.error('Error al obtener datos del usuario:', error);
    });

}
}
