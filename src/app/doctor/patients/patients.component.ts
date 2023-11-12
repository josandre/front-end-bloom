import { Component, OnInit, inject } from '@angular/core';
import { Patient } from './models/Patient';
import { SpecialistService } from './services/specialist.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit{
  constructor(public specialistService: SpecialistService) {}

  patients: Patient[];
  flag: boolean = false;
  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void {
    this.specialistService.getAllPatients()
      .subscribe(
        data => {
          this.patients = data;
          console.log(data);
          this.flag = true;
        },
        error => {
          console.log(error);
        });
  }
}
