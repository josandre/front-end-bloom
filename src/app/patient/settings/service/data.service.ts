import { Injectable } from '@angular/core';
import{ProvinciaI,CantonI,DistritoI} from '../models/model.intercafe';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DataService {
private provincias: ProvinciaI[];
private cantones: CantonI[];
private distrito: DistritoI[];

  constructor(private http: HttpClient) { 

 
  }
  ngOnInit() {
    this.http.get<ProvinciaI[]>('../../../asets/data/dataprovinvias.json').subscribe((data) => {
      this.provincias = data;
    });
    this.http.get<CantonI[]>('../../../asets/data/dataCantones.json').subscribe((dataC) => {
        this.provincias = dataC;
      });
  }
  getProvincias():ProvinciaI[]{
    return this.provincias;
  }
  getCantones():CantonI[]{
    return this.cantones;
  }

}