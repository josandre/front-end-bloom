import { Component, OnInit, inject } from '@angular/core';
import { Patient } from './model/Patient';
import { SpecialistService } from './service/specialist.service';
import {UploadFileService} from "../../global/upload-file/upload-file.service";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit{
  constructor(public specialistService: SpecialistService, private readonly fileService: UploadFileService) {}

  patients: Patient[];

  isLoading: boolean = false

  messageLoading: string = 'PATIENTS_LISTS.MESSAGE_LOADING'
  messageData: string = 'PATIENTS_LISTS.MESSAGE_NO_DATA'

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void {
    this.isLoading = true;
    this.specialistService.getAllPatients()
      .subscribe(
        data => {
          this.patients = data;
          console.log(this.patients)
          this.isLoading = false;
        },
        error => {
          console.log(error.status);
        });
  }

  patientsIsEmpty(){
    return !this.patients || !this.patients.length;
  }


  getPhoto(urlPhoto: string){
    return this.fileService.getPhotoToList("assets/images/user/user.png", urlPhoto)
  }

}
