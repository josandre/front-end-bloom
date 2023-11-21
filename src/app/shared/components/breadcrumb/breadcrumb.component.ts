import { Component, Input } from '@angular/core';
import { AuthService } from '@core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input()
  title!: string;
  @Input()
  items!: string[];
  @Input()
  active_item!: string;

  constructor(private authService: AuthService) {
    //constructor
  }
  getDashboardLink(): string {
    const userRole = this.authService.currentUserValue.role;
    if (userRole === 'Admin') {
      return '/admin/dashboard/main';
    } else if (userRole === 'Patient') {
      return '/patient/dashboard';
    } else {
      return '/doctor/dashboard';
    } 
  }
}
