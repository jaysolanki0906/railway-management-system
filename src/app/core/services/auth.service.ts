import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { login, User } from '../model/registermodel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api:ApiService,private token:TokenService) { }
  login(payload:login){
    return this.api.post('auth/login',payload);
  }
  refreshToken(){
    return this.api.post('auth/refresh',{"refresh_token":this.token.getRefreshToken()});
  }
  register(paylod:User){
    return this.api.post('auth/register',paylod);
  }
  changePassword(payload:any){
    return this.api.post('auth/change_password',payload);
  }
}
