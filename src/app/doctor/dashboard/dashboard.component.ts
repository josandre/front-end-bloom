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
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexResponsive,
} from 'ng-apexcharts';
import {AuthService} from "@core";

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
  name: string
  
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.name = this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName

    this.initTopAnxietyCases();
    this.initAnxietyLevelGroupingChart();
  }
  private initTopAnxietyCases() {
    this.topAnxietyCasesOptions = {
      series: [
        {
          data: [120, 90, 85, 50, 30, 20, 19, 14, 10, 5]
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
        categories: [
          "Paciente",
          "Paciente",
          "Paciente",
          "Paciente",
          "Paciente",
          "Paciente",
          "Paciente",
          "Paciente",
          "Paciente",
          "Paciente"
        ]
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
    this.anxietyLevelGroupingOptions = {
      series: [5, 15, 18, 25, 36],
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
