import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@config';
import {
  AuthService,
  InConfiguration,
  LanguageService,
  RightSidebarService,
} from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {WebSocketService} from "../../global/services/web-socket.service";
import {NotificationsService} from "./services/notifications.service";
import {SystemNotification} from "./models/SystemNotification";
import {EventCategory} from "../../global/models/eventcategory";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public config!: InConfiguration;
  WORK: EventCategory.WORK;
  PERSONAL: EventCategory.PERSONAL;
  IMPORTANT: EventCategory.IMPORTANT;
  userImg?: string;
  userName: string;
  homePage?: string;
  isNavbarCollapsed = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  docElement?: HTMLElement;
  isFullScreen = false;
  notificationsList: Array<SystemNotification> = [];
  notificationsCounter = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private webSocketService: WebSocketService,
    private notificationService: NotificationsService
  ) {
    super();
  }

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.svg', lang: 'es' },
  ];


  ngOnInit() {
    this.userName = this.authService.currentUserValue.firstName +  " " + this.authService.currentUserValue.lastName;
    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;

    this.docElement = document.documentElement;

    if (userRole === 'Admin') {
      this.homePage = 'admin/dashboard/main';
    } else if (userRole === 'Patient') {
      this.homePage = 'patient/dashboard';
    } else if (userRole === 'Doctor') {
      this.homePage = 'doctor/dashboard';
    } else {
      this.homePage = 'admin/dashboard/main';
    }

    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.svg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    this.notificationService.getNotifications().subscribe((notification) => {
      this.notificationsList = notification.list;
      console.log("endpoint", this.notificationsList)
    })

    this.webSocketService.notificationReceived$.subscribe((notifications) => {

      this.notificationsList = [...notifications, ...this.notificationsList]
      console.log("socket", this.notificationsList)
      console.log("from socket", notifications)
      this.notificationsCounter ++;
    })

  }

  profile(){
    if(this.authService.currentUserValue.role==='Doctor'){
      this.router.navigate(['/doctor/doctor-profile']);
    }else if(this.authService.currentUserValue.role==='Patient'){
      this.router.navigate(['/patient/patient-profile']);
    }
  }

  callFullscreen() {
    if (!this.isFullScreen) {
      if (this.docElement?.requestFullscreen != null) {
        this.docElement?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }

  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }

  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }

  logout() {
    this.webSocketService.closeWebSocket();
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }

  startCounter(){
    this.notificationsCounter = 0;

  }

  getDate(date: Date){
    return new Date(date).toLocaleDateString()
  }
}
