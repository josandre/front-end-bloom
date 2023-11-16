import { Component, OnInit, inject } from '@angular/core';
import { Patient } from './model/Patient';
import { SpecialistService } from './service/specialist.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit{
  constructor(public specialistService: SpecialistService) {}

  patients: Patient[];

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void {
    this.specialistService.getAllPatients()
      .subscribe(
        data => {
          this.patients = data;
        },
        error => {
          console.log(error.status);
        });
  }
}
