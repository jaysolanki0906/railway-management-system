import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api:ApiService) { }
  getusers(){
    return this.api.get('profiles');
  }
  getUserById(id:number){
    return this.api.get(`profiles/${id}`);
  }
  patchUser(id:number,payload:any){
    return this.api.patch(`profiles/${id}`,payload);
  }
  addUser(payload:any)
  {
    return this.api.post(`profiles`,payload);
  }
  delete(id:any)
  {
    return this.api.delete(`profiles/${id}`);
  }
  booking(payload:any)
  {
    return this.api.post(`booking`,payload);
  }
  
}
