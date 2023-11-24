import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexResponsive,
} from 'ng-apexcharts';
import { AuthService } from "@core";
import { Case, TOP_ANSIETY_CASES } from './provitionals/top-anxiety-cases';
import { Group, LEVELS } from './provitionals/anxiety-level-group';
import { PatientCounts } from '../models/dashboard';
import { DashboardDoctorService } from '../services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';
import { Event, MedicalRecordI } from 'app/patient/dashboard/dashboard.service';
import { Subscription } from 'rxjs';

export type topAnxietyCases = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

export type anxietyLevelGroupingChart = {
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  responsive?: ApexResponsive[];
  labels?: string[];
  colors?: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart')
  chart!: ChartComponent;
  
  private langChangeSubscription: Subscription;

  public topAnxietyCasesOptions: Partial<topAnxietyCases>;
  public anxietyLevelGroupingOptions: Partial<anxietyLevelGroupingChart>;

  public levels = LEVELS; // Asegúrate de que esté importado correctamente
  public percentages: number[] = [];
  public isLoadingAnxietyLevels = true;

  name: string;
  public patientCounts: PatientCounts;
  public resourceCounts: Number; 
  public isLoadingPatients = true;
  public isLoadingResources = true; 

  isLoadingTopAnxietyCases = true; 
  topAnxietyCases: Case[] = []; 

  constructor(
    private readonly authService: AuthService,
    private dashboardService: DashboardDoctorService,
    private translate: TranslateService
  ) {}

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.name = this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName

    this.dashboardService.getCountPatients().subscribe(
      (data) => {
        this.patientCounts = data;
        this.isLoadingPatients = false; // Cuando los datos llegan, no estamos cargando más
      },
      (error) => {
        console.error('Error al obtener datos de pacientes:', error);
        this.isLoadingPatients = false; // En caso de error, también dejamos de cargar
      }
    );
    this.dashboardService.getCountResources().subscribe(
      (data) => {
        console.log(data)
        this.resourceCounts = data;
        this.isLoadingResources = false; // Cuando los datos llegan, no estamos cargando más
      },
      (error) => {
        console.error('Error al obtener datos de recursos:', error);
        this.isLoadingResources = false; // En caso de error, también dejamos de cargar
      }
    );

    this.dashboardService.getEvents().subscribe(
      events => {
        this.processTopAnxietyCases(events);
        this.isLoadingTopAnxietyCases = false;
      },
      error => {
        console.error('Error al obtener eventos:', error);
        this.isLoadingTopAnxietyCases = false;
      }
    );

    this.dashboardService.getMedicalRecords().subscribe(
      records => {
        this.processMedicalRecords(records);
      },
      error => {
        console.error('Error al obtener registros médicos:', error);
      }
    );
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateGraphTranslations();
    });
  }
  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private processMedicalRecords(records: MedicalRecordI[]) {
    const groupCounts: { [key: string]: number } = this.levels.reduce((acc: any, level: any) => {
      acc[level.level] = 0;
      return acc;
    }, {});

    records.forEach(record => {
      record.medicalHistories.forEach((history : any) => {
        const level = history.anxietyLevel || 'INDETERMINATE';
        groupCounts[level] += 1;
      });
    });

    this.updateAnxietyLevels(groupCounts);
    this.isLoadingAnxietyLevels = false;
  }
  

  private updateAnxietyLevels(counts: { [key: string]: number }) {
    const totalPatients = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    this.levels.forEach(level => {
      const levelCount = counts[level.level];
      level.patients = levelCount;
      this.percentages[parseInt(level.level) - 1] = parseFloat(((levelCount / totalPatients) * 100).toFixed(1));
    });
  }
  
  
  private calculatePercentages(levels: Group[]): void {
    const totalPatients = levels.reduce((sum, level) => sum + level.patients, 0);
    levels.forEach((level, index) => {
      this.percentages[index] = parseFloat(((level.patients / totalPatients) * 100).toFixed(1));
      console.log(`Level: ${level.level}, Percentage: ${this.percentages[index]}%`);
    });
  }
  
  
  private processTopAnxietyCases(events: Event[]) {
    const counts: {[key: string]: number} = {};
    events.forEach(event => {
      const patientName = `${event.user.name} ${event.user.lastName}`;
      counts[patientName] = (counts[patientName] || 0) + 1;
    });
  
    const sortedCases = Object.entries(counts)
      .map(([name, cases]) => ({ name, cases }))
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 5); 
  
    this.topAnxietyCases = sortedCases;
    this.initTopAnxietyCases();
  }

  private updateGraphTranslations() {
    this.initTopAnxietyCases();
  }


  private initTopAnxietyCases() {

    const categories = this.topAnxietyCases.map(c => c.name);
    const seriesData = this.topAnxietyCases.map(c => c.cases);
  
    this.topAnxietyCasesOptions = {
      series: [
        {
          data: seriesData
        }
      ],
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      colors: [
        "#e53935", // Rojo brillante al inicio
        "#fdd835", // Amarillo brillante
        "#7cb342", // Verde claro
        "#26a69a", // Verde azulado
        "#29b6f6", // Azul claro vibrante
        "#1e88e5", // Azul medio
        "#3949ab", // Azul índigo
        "#8e24aa", // Púrpura
        "#d81b60", // Rosa fucsia
        "#ff7043", // Naranja quemado
        "#43a047"  // Verde oscuro al final
      ],      
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: (val, opt) => {
          // Usar el servicio de traducción aquí
          const attacksTranslation = this.translate.instant('DASHBOARD_DOCTOR.ATTACKS');
          return `${opt.w.globals.labels[opt.dataPointIndex]}:  ${val} ${attacksTranslation}`;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      }
    };
  }

  // private initAnxietyLevelGroupingChart() {

  //   const percentages = this.calculatePercentages(LEVELS);

  //   this.anxietyLevelGroupingOptions = {
  //     series: percentages,
  //     chart: {
  //       type: 'pie',
  //       width: 270,
  //     },
  //     legend: {
  //       show: false,
  //     },
  //     dataLabels: {
  //       enabled: true,
  //     },
  //     labels: ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5'],
  //     colors: ['#4caf50', '#00bcd4', '#2196f3', '#f9cb40', '#bb2e45']
  //   };
  // }
}

interface MedicalRecipe {
  id: number;
  name: string;
  creationDate: string;
  indications: string;
}

interface MedicalHistory {
  id: number;
  creationDate: string;
  observations: string;
  anxietyLevel: 'INDETERMINATE' | 'MINIMAL' | 'MILD' | 'MODERATE' | 'SEVERE' | 'DEBILITATING' | null;
  treatmentStartDate: string;
  treatmentEndDate: string;
  medicalRecipe: MedicalRecipe;
  readable: boolean;
  monthsOfTreatment: number;
  yearsOfTreatment: number;
  daysOfTreatment: number;
}