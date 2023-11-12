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
import { TOP_ANSIETY_CASES } from './provitionals/top-anxiety-cases';
import { Group, LEVELS } from './provitionals/anxiety-level-group';
import { PatientCounts } from '../models/dashboard';
import { DashboardDoctorService } from '../services/dashboard.service';

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
  
  public topAnxietyCasesOptions: Partial<topAnxietyCases>;
  public anxietyLevelGroupingOptions: Partial<anxietyLevelGroupingChart>;

  public levels = LEVELS;
  public percentages: number[] = [];

  name: string;
  public patientCounts: PatientCounts;
  public resourceCounts: Number; 
  public isLoadingPatients = true;
  public isLoadingResources = true; // Variable para la carga de recursos

  constructor(
    private readonly authService: AuthService,
    private dashboardService: DashboardDoctorService
  ) {}

  ngOnInit() {
    this.name = this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName
    this.percentages = this.calculatePercentages(LEVELS);

    // Llamar al servicio y manejar la carga de datos de pacientes
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

    // Llamar al servicio de recursos y manejar la carga de datos de recursos
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

    this.initTopAnxietyCases();
    this.initAnxietyLevelGroupingChart();
  }

  private calculatePercentages(levels: Group[]): number[] {
    const totalPatients = levels.reduce((sum, level) => sum + level.patients, 0);
    return levels.map(level => parseFloat(((level.patients / totalPatients) * 100).toFixed(1)));
  }


  private initTopAnxietyCases() {

    const categories = TOP_ANSIETY_CASES.map(c => c.name);
    const seriesData = TOP_ANSIETY_CASES.map(c => c.cases);
  
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
        "#fb8c00", // Naranja intenso
        "#ec407a", // Rosa fuerte
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
        formatter: function(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + " ataques";
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
      // title: {
      //   text: "Custom DataLabels",
      //   align: "center",
      //   floating: true
      // },
      // subtitle: {
      //   text: "Category Names as DataLabels inside bars",
      //   align: "center"
      // },
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
  private initAnxietyLevelGroupingChart() {

    const percentages = this.calculatePercentages(LEVELS);

    this.anxietyLevelGroupingOptions = {
      series: percentages,
      chart: {
        type: 'pie',
        width: 270,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
      },
      labels: ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5'],
      colors: ['#4caf50', '#00bcd4', '#2196f3', '#f9cb40', '#bb2e45']
    };
  }
}
