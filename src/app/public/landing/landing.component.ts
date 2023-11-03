import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { REVIEWS } from './reviews.constants';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  searchForm: FormGroup;

  // Opciones para ngx-owl-carousel-o
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
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  };

  //Constante REVIEWS importada de reviews.constants.ts
  reviewItems = REVIEWS;

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/authentication/signin']);  // Cambia esta ruta a la ruta correcta de login si es necesario
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      inputField: new FormControl(''),
      selectField: new FormControl('')
    });
  }

  onSubmit() {
    // Lógica al enviar el formulario
    console.log(this.searchForm.value);
  }

}
