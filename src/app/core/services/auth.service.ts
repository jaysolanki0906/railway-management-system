import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { login, User } from '../model/registermodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api:ApiService) { }
  login(payload:login){
    return this.api.post('auth/login',payload);
  }
  refreshToken(){
    return this.api.post('auth/refresh',{});
  }
  register(paylod:User){
    return this.api.post('auth/register',paylod);
  }
}
