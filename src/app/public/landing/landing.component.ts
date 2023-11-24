import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción
import { REVIEWS } from './reviews.constants';
import { PublicService } from '../services/public.service'; // Importa el servicio público
import { Doctor } from '../landing/doctors.constants';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  searchForm: FormGroup;
  filteredDoctorsItems: Doctor[] = [];
  uniqueRoles: string[] = [];
  reviewItems = REVIEWS.map((review, id) => ({
    ...review,
    reviewText: this.translate.instant('LANDING.REVIEWS.REVIEW_' + (id + 1) + '.TEXT'),
    reviewerName: this.translate.instant('LANDING.REVIEWS.REVIEW_' + (id + 1) + '.NAME'),
    reviewerPosition: this.translate.instant('LANDING.REVIEWS.REVIEW_' + (id + 1) + '.POSITION')
  }));
  isLoading = false; // Variable para controlar el preloader
  doctorsItems: Doctor[] = [];

  // Opciones de carusel de reviews
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
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private publicService: PublicService,
    private translate: TranslateService // Inyecta el servicio de traducción
  ) {
    // Configura el servicio de traducción (asegúrate de tenerlo configurado en tu app)
    translate.setDefaultLang('en'); // Establece el idioma predeterminado
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        const element = document.querySelector('#' + fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    this.searchForm = new FormGroup({
      inputField: new FormControl(''),
      selectField: new FormControl(''),
    });
    this.loadDoctors(); // Llama a la función para cargar los doctores
  }

  // Carga las profesiones de los doctores
  private populateRoles(): void {
    const roleSet = new Set(this.doctorsItems.map((doctor) => doctor.role));
    this.uniqueRoles = Array.from(roleSet);
  }

  // Filtrado de doctores
  applyFilter(): void {
    const searchText = this.normalizeText(
      this.searchForm.get('inputField')?.value || ''
    );
    const role = this.normalizeText(
      this.searchForm.get('selectField')?.value || ''
    );

    this.filteredDoctorsItems = this.doctorsItems.filter((doctor) => {
      const matchesName = this.normalizeText(doctor.name).includes(searchText);
      const matchesProfession =
        !role || this.normalizeText(doctor.role).includes(role);
      return matchesName && matchesProfession;
    });
  }

  // Normaliza el texto para que no haya problemas con las tildes
  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // Navegación a la página de login
  navigateToLogin(): void {
    this.router.navigate(['/authentication/signin']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/authentication/signup']);
  }

  // Carga los doctores desde el servicio público
  private loadDoctors(): void {
    this.isLoading = true;
    this.publicService.getDoctors().subscribe(
      (doctors) => {
        this.doctorsItems = doctors; // Actualiza la lista de doctores
        this.populateRoles();
        this.applyFilter(); // Aplica el filtro después de cargar los doctores
        this.isLoading = false; // Detiene el preloader cuando los datos se cargan
      },
      (error) => {
        console.error('Error al cargar los doctores:', error);
        this.isLoading = false; // Detiene el preloader en caso de error
      }
    );
  }
}
