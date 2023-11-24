import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentLang: string;

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.currentLang = 'en'; // Idioma predeterminado
  }

  ngOnInit(): void {
    this.translate.use(this.currentLang);
  }

  navigateToLogin(): void {
    this.router.navigate(['/authentication/signin']);
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  isLanguageActive(lang: string): boolean {
    return this.currentLang === lang;
  }
}
