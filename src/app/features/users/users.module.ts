import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: UserTableComponent },
  {path:'edit/:id',component:UserFormComponent},
  {path:'view/:id',component:UserFormComponent},
];

@NgModule({
  declarations: [UserTableComponent,UserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class UsersModule { }
