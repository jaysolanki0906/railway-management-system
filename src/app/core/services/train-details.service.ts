import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainDetailsService {

  constructor(private api:ApiService) { }
  trainpnr(pnrNumber:number)
  {
    const params = new HttpParams().set('pnr', pnrNumber.toString());
    return this.api.get('trains/pnr_status', { params });
  }
  fetchTrain(from: string, to: string, date: string) {
  let params = new HttpParams()
    .set('from', from)
    .set('to', to)
    .set('date', date);

  return this.api.get('trains/find_train', { params });
}
}
