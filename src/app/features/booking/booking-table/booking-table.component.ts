import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowBookingComponent } from '../show-booking/show-booking.component';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-booking-table',
  standalone:false,
  templateUrl: './booking-table.component.html',
  styleUrl: './booking-table.component.scss'
})
export class BookingTableComponent implements OnInit {
  tickets:any[] =[];
  constructor(private booking:BookingService,
    private loader:LoaderService,
    private dialog: MatDialog,
  ){}
  ngOnInit(): void {
      this.fetchData()
  }
  fetchData()
  {
    this.booking.fetchBooking().subscribe({
      next:(res:any)=>{
        this.tickets = res.filter((e: any) => (e.status == "CONFIRMED"));
        console.log("this is res:",res);
        this.loader.hide();
        console.log(this.tickets);
      },
      error:(err)=>{console.log("err",err)}
    })
  }
  onDelete(tickit:any){
    this.dialog.open(ShowBookingComponent,{
      width:'600px',
      data:{tickit,mode:'delete'}
    })
  }
  view(tickit:any){
    this.dialog.open(ShowBookingComponent,{
      width: '600px',
      data: { tickit,mode:'view'}
    });
  }
}
