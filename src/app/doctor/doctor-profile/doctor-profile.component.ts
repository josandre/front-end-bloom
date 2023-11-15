import {Component, OnInit} from '@angular/core';
import {Specialist} from "./models/Specialist";
import {DoctorService} from "./services/doctor-profile.services";
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent implements OnInit{
  specialist : Specialist ;
  loading : boolean = true;


  constructor(private readonly doctorProfileService: DoctorService) {}

  ngOnInit(): void {
    this.doctorProfileService.getDataUser().subscribe((specialist) => {
      this.specialist = specialist;
      this.loading = false;
    })
  }


}
