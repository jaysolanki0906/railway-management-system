import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone:false,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  ngOnInit(): void {
      console.log("this is dajshopmml");
  }

}
