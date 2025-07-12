import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../../../core/model/usermodel';
import { UserService } from '../../../core/services/user.service';
import { subscribeOn, Subscriber, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-user-table',
  standalone:false,
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit,OnDestroy{
  users:any[] =[];
  apiUnsubscribe: Subscription = new Subscription();
  constructor(private userService:UserService,private router: Router,private dialog: MatDialog){
  }
  ngOnInit(): void {
    this.fetchUserData()
  }
  ngOnDestroy(): void {
      this.apiUnsubscribe.unsubscribe();
  }
  fetchUserData(){
    this.apiUnsubscribe=this.userService.getusers().subscribe({
      next:(res:any)=>{
        this.users=res;
      },
      error:(err:any)=>{
        this.ngOnDestroy();
      }
    })
  }
  onDelete(user:any)
  {
    this.apiUnsubscribe=this.userService.delete(user.id).subscribe({
      next:()=>{
        alert("User deleted sucessfully");
        this.fetchUserData();
      }
    })
  }
  edit(user: any) {
  this.dialog.open(UserFormComponent, {
    width: '600px',
    data: { id: user.id, mode: 'edit' }
  }).afterClosed().subscribe((res) => {
    if(res=="true")
    this.fetchUserData();
  });
}
  add()
  {
    this.dialog.open(UserFormComponent,{width:'600px',data:{mode:'add'}}).afterClosed().subscribe((res) => {
    if(res=="true")
    this.fetchUserData();
  });;
  }
  view(user:User)
  {
    this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { id: user.id,mode:'view' }
    });
  }
}
