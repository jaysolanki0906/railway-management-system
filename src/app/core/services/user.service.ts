import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { of } from 'rxjs';

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
  getProfile()
  {
    return of({
    "id": "61573f9d-9b66-4897-9055-781b3cb178b2",
    "user_id": "e09c6cbd-0851-448a-b758-bf30038b2cab",
    "first_name": "Jay",
    "last_name": "Solanki",
    "gender": "MALE",
    "dateofbirth": "2001-06-09",
    "created_at": "2025-07-09T09:18:02.641Z",
    "updated_at": "2025-07-09T09:18:02.641Z"
  });
  }
}
