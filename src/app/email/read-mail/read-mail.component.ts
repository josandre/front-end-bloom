import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.scss'],
})
export class ReadMailComponent implements OnInit{
  constructor(private readonly resourceService: ResourceService) {  }
  id: string|null;
  resource: Resource;
  patientsList: User[];
  flag: boolean = false;
  ngOnInit() {
    this.id = sessionStorage.getItem('resourseId');

    if(this.id != null) {
      this.resourceService.getResourceById(parseInt(this.id)).subscribe(
        data => {
          this.resource = data;
          this.patientsList = JSON.parse(JSON.stringify(data.users));
          sessionStorage.removeItem('resourceId');
          sessionStorage.clear();
          this.flag = true;
        },
        error => {
          console.log(error);
        }
      )
    }else{
      console.log("resourse id was null");
    }

  }
}
