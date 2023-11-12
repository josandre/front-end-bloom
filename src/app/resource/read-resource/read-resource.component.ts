import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
@Component({
  selector: 'app-read-resource',
  templateUrl: './read-resource.component.html',
  styleUrls: ['./read-resource.component.scss'],
})
export class ReadResourceComponent implements OnInit{
  constructor(private readonly resourceService: ResourceService) {  }
  id: string|null;
  resource: Resource;
  patientsList: User[];
  flag: boolean = false;
  role = this.resourceService.getRole();
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
