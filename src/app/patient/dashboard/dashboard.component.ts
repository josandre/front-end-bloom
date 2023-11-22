/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexFill
} from 'ng-apexcharts';
import { AuthService } from "@core";
import { AXIENTY_PROGRESS } from './provitionals/anxiety-progress';
import { RECORDED_ATTACKS } from './provitionals/recorded-attacks';
import { TranslateService } from '@ngx-translate/core';
import { DashboardDoctorService, MedicalRecordI } from './dashboard.service';
import * as moment from 'moment';
import 'moment/locale/es'; // Para español


export type anxietyScaleDataOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type recordedAttacksOptions = {
  series?: ApexAxisChartSeries;
  series2?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  xaxis?: ApexXAxis;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  grid?: ApexGrid;
  markers?: ApexMarkers;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart')
  chart!: ChartComponent;
  public anxietyScaleDataOptions!: Partial<anxietyScaleDataOptions>;
  public recordedAttacksOptions: Partial<recordedAttacksOptions>
  name: string
  totalAttacks: number;
  lastAttackDate: string;
  daysWithoutAttack: number;
  isLoadingEvents: boolean = true; 
  lastEventDate: string;
  attacksData: any[]; 

  isMedicalDataLoading: boolean = true;
  medicalRecord: MedicalRecordI;
  currentAnxietyLevel: string;

  constructor(
    private dashboardDoctorService: DashboardDoctorService,
    private readonly authService: AuthService,
    private translate: TranslateService
  ) { }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {
    console.log(this.authService.currentUserValue)
    this.name = this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName
    this.fetchEvents();
    this.fetchMedicalRecord();
    this.translate.onLangChange.subscribe(langChangeEvent => {
      this.updateDatesForLanguage(langChangeEvent.lang);
    });
  }

fetchEvents() {
  this.isLoadingEvents = true;  
  this.dashboardDoctorService.getEvents().subscribe(events => {
    if (Array.isArray(events) && events.length > 0) {
      const lastEvent = events[events.length - 1];
      this.totalAttacks = events.length;
      this.lastEventDate = lastEvent.date;
      this.updateDatesForLanguage(this.translate.currentLang);
      this.daysWithoutAttack = moment().diff(moment(lastEvent.date), 'days');
      this.processAttacksData(events);
    } else {
      this.totalAttacks = 0;
      this.lastAttackDate = this.translate.instant('DASHBOARD_PATIENT.NO_RECENT_ATTACKS');
      this.daysWithoutAttack = 0;
      this.attacksData = [];
    }
    this.isLoadingEvents = false;  
  });
}


  processAttacksData(events: any[] ) {
    const attackCountsByDate = events.reduce((acc, event) => {
      const formattedDate = moment(event.date).format('D MMMM');
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {});

    this.attacksData = Object.entries(attackCountsByDate).map(([date, count]) => {
      return { date, count };
    });

    this.initRecordedAttacks();
  }
  
  updateDatesForLanguage(lang: string) {
    moment.locale(lang); // Actualiza el idioma de moment
    if (this.lastEventDate) {
      // Formato actualizado para mostrar solo el día y el mes
      this.lastAttackDate = moment(this.lastEventDate).format('D MMMM');
    }
  }
  
  fetchMedicalRecord() {
    this.dashboardDoctorService.getMedicalRecord().subscribe(record => {
      this.medicalRecord = record;
      this.initAnxietyProgress();
      if (record.medicalHistories && record.medicalHistories.length > 0) {
        const lastMedicalHistory = record.medicalHistories[record.medicalHistories.length - 1];
        this.currentAnxietyLevel = 'ANXIETY_LEVEL.' + lastMedicalHistory.anxietyLevel;
      } else {
        this.currentAnxietyLevel = 'ANXIETY_LEVEL.INDETERMINATE'; 
      }
      this.isMedicalDataLoading = false;
    });
  }

  private convertAnxietyLevelToNumber(level: string): number {
    const levels: { [key: string]: number } = {
      'MINIMAL': 1,
      'MILD': 2,
      'MODERATE': 3,
      'SEVERE': 4,
      'DEBILITATING': 5,
      'INDETERMINATE': 0 
    };
    return levels[level] ?? 0; 
  }
  private initAnxietyProgress() {
    if (this.medicalRecord && this.medicalRecord.medicalHistories.length > 0) {
      const levelsData = this.medicalRecord.medicalHistories.map((history: { anxietyLevel: string; }) => 
        this.convertAnxietyLevelToNumber(history.anxietyLevel)
      );
      const datesData = this.medicalRecord.medicalHistories.map((history: { creationDate: moment.MomentInput; }) => 
        moment(history.creationDate).format('D MMMM')
      );
  
      this.anxietyScaleDataOptions = {
        series: [
          {
            name: 'Nivel de Ansiedad del paciente',
            data: levelsData,
          },
        ],
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          foreColor: '#9aa0ac',
          toolbar: {
            show: false,
          },
        },
        colors: ['#FCB939'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        markers: {
          size: 1,
        },
        grid: {
          show: true,
          borderColor: '#9aa0ac',
          strokeDashArray: 1,
        },
        xaxis: {
          categories: datesData,
          title: {
            text: 'Sesiones',
          },
        },
        yaxis: {
          title: {
            text: 'Nivel de Ansiedad',
          },
        },
        tooltip: {
          theme: 'dark',
          marker: {
            show: true,
          },
          x: {
            show: true,
          },
        },
      };
    } 
  }

  
  private initRecordedAttacks() {

    const attackCounts = this.attacksData.map(a => a.count);
    const attackDates = this.attacksData.map(a => a.date);

    this.recordedAttacksOptions = {
      series: [
        {
          name: 'Ataques de Ansiedad',
          data: attackCounts
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: attackDates,
        labels: {
          style: {
            colors: '#9aa0ac',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Cantidad de ataques',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
}
