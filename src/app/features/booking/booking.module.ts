import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingTableComponent } from './booking-table/booking-table.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BookingTableComponent },
];

@NgModule({
  declarations: [BookingTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class BookingModule { }
