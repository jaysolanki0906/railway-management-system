import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFromComponent } from './password-from/password-from.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: PasswordFromComponent }
];

@NgModule({
  declarations: [PasswordFromComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PasswordModule { }
