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
import {AuthService} from "@core";
import { AXIENTY_PROGRESS } from './provitionals/anxiety-progress';
import { RECORDED_ATTACKS } from './provitionals/recorded-attacks';
import { TranslateService } from '@ngx-translate/core';

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


  constructor(
    private readonly authService: AuthService,
    private translate: TranslateService  
  ) {}

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.name = this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName
    
    this.initAnxietyProgress();
    this.initRecordedAttacks();
  }

  private initAnxietyProgress() {
    const levelsData = AXIENTY_PROGRESS.map(a => a.level);
    const datesData = AXIENTY_PROGRESS.map(a => a.date);

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
  private initRecordedAttacks() {
    
    const attackCounts = RECORDED_ATTACKS.map(a => a.count);
    const attackDates = RECORDED_ATTACKS.map(a => a.date);

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
