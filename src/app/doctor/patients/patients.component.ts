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
  isEmpty: boolean = false
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
          this.isLoading = false;

         if(!this.patients || !this.patients.length) {
           this.isEmpty = true
         }
        },
        error => {
          console.log(error.status);
        });
  }


  getPhoto(urlPhoto: string){
    return this.fileService.getPhotoToList("assets/images/user/user.png", urlPhoto)
  }

}
