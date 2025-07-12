import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private api:ApiService) { }
  paymentConfirm(paylod:any)
  {
    return this.api.post('payments/confirm',paylod);
  }
  paymentStatus(id:string)
  {
    return this.api.get(`payments/${id}/status`);
  }
}
