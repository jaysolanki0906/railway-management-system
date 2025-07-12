import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private api:ApiService) { }
  fetchBooking()
  {
    return this.api.get('booking');
  }
  deleteBooking(id:string,payload:any)
  {
    return this.api.post(`booking/${id}/cancel`,payload);
  }
  fetchOneBooking(id:string)
  {
    return this.api.get(`booking/${id}`);
  }
}
