import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexMarkers,
  ChartComponent
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
};

interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  color: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone:false,
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;
  statistics: StatCard[] = [
    {
      title: 'Total Trains',
      value: 156,
      icon: 'train',
      trend: {
        value: 12,
        isUpward: true
      },
      color: '#4CAF50'
    },
    {
      title: 'Total Stations',
      value: 42,
      icon: 'location_city',
      color: '#2196F3'
    },
    {
      title: 'Total Revenue',
      value: '$2.4M',
      icon: 'attach_money',
      trend: {
        value: 8.5,
        isUpward: true
      },
      color: '#FF9800'
    },
    {
      title: 'Total Workers',
      value: 1245,
      icon: 'groups',
      trend: {
        value: 3,
        isUpward: false
      },
      color: '#E91E63'
    },
    {
      title: 'Active Locomotives',
      value: 85,
      icon: 'tram',
      trend: {
        value: 4,
        isUpward: true
      },
      color: '#00BFAE'
    },
    {
      title: 'Freight Cars',
      value: 420,
      icon: 'local_shipping',
      color: '#795548',
      trend: {
        value: 2,
        isUpward: true
      }
    },
    {
      title: 'On-Time Departures',
      value: '95%',
      icon: 'schedule',
      trend: {
        value: 1.2,
        isUpward: true
      },
      color: '#8BC34A'
    },
    {
      title: 'Tickets Sold Today',
      value: 3420,
      icon: 'confirmation_number',
      trend: {
        value: 7,
        isUpward: true
      },
      color: '#3F51B5'
    },
    {
      title: 'Railway Bridges',
      value: 67,
      icon: 'foundation',
      trend: {
        value: 1.5,
        isUpward: true
      },
      color: '#607D8B'
    },
    {
      title: 'Signals Operational',
      value: 312,
      icon: 'signal_cellular_alt',
      trend: {
        value: 0.9,
        isUpward: true
      },
      color: '#FBC02D'
    }
  ];

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Ticket Sales",
          data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      title: {
        text: "Ticket Sales Over Time",
        align: "left"
      },
      markers: {
        size: 5,
        colors: ["#2196F3"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: { size: 7 }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        labels: { style: { colors: "#607d8b" } }
      }
    };
  }

  ngOnInit(): void {
    console.log("this is dashboard");
  }
}