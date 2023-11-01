import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }
 
  navigateToLogin() {
    this.router.navigate(['/authentication/signin']);  // Asume que la ruta a tu pantalla de login es '/login'
  }
 
  ngOnInit(): void {
  }

}
