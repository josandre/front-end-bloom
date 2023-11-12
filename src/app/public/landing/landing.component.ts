import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { REVIEWS } from './reviews.constants';
import { PROVITIONAL_DOCTORS, Doctor  } from './doctors-test.constants';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  searchForm: FormGroup;
  filteredDoctorsItems: Doctor[] = [];
  uniqueRoles: string[] = [];
  reviewItems = REVIEWS;
  doctorsItems = PROVITIONAL_DOCTORS;

  //Opciones de carusel de reviews
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 3000,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      }
    },
    nav: false
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      inputField: new FormControl(''),
      selectField: new FormControl('')
    });
    this.populateRoles();
    this.applyFilter(); // Aplica el filtro inicialmente para cargar todos los doctores
  }

  //Carga las profesiones de los doctores
  private populateRoles(): void {
    const roleSet = new Set(this.doctorsItems.map(doctor => doctor.role));
    this.uniqueRoles = Array.from(roleSet);
  }

  //Filtrado de doctores
  applyFilter(): void {
    const searchText = this.normalizeText(this.searchForm.get('inputField')?.value || '');
    const role = this.normalizeText(this.searchForm.get('selectField')?.value || '');
  
    this.filteredDoctorsItems = this.doctorsItems.filter(doctor => {
      const matchesName = this.normalizeText(doctor.name).includes(searchText);
      const matchesProfession = !role || this.normalizeText(doctor.role).includes(role);
      return matchesName && matchesProfession;
    });
  } 
  
  //Normaliza el texto para que no haya problemas con las tildes
  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  //Navegación a la página de login
  navigateToLogin(): void {
    this.router.navigate(['/authentication/signin']);
  }

}
