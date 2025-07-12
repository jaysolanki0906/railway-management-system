import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit,OnDestroy {
  @Output() close=new EventEmitter<void>();
  userId: string = '';
  mode: string = "";
  isViewMode:boolean=false;
  userForm!: FormGroup;
  apiUnsubscribe: Subscription = new Subscription();
  showSuccessMessage = false;
  constructor(
    private user:UserService,
  private formBuilder: FormBuilder,
public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.isViewMode = data.mode === 'view';
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      dateofbirth:['',[Validators.required]]
    });
    if(this.isViewMode)
    {
      this.userForm.disable();
    }
    if(this.data.mode!=='add')
    this.callData();
  }
    ngOnInit(): void {
    this.mode = this.data.mode
    this.userId = this.data.id;
  }
  ngOnDestroy(): void {
      this.apiUnsubscribe.unsubscribe();
  }
  callData() {
  this.apiUnsubscribe = this.user.getUserById(this.data.id).subscribe({
    next: (res: any) => {
      this.userForm.patchValue({
        first_name: res.first_name || '',
        last_name: res.last_name || '',
        gender: res.gender || '',
        dateofbirth:res.dateofbirth||'',
      });
    },
    error: (err) => {
      console.error('Error fetching user data:', err);
    }
  });
}
   onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log('Form Data:', formData);
      this.showSuccessMessage = true;
      if(this.data.mode=='edit')
      this.apiUnsubscribe=this.user.patchUser(this.data.id,formData).subscribe({
        next:()=>{
          this.dialogRef.close("true");
          this.close.emit();
        },
        error:()=>{
          this.dialogRef.close();
        }
      })
      else if(this.data.mode=='add')
        this.apiUnsubscribe=this.user.addUser(formData).subscribe({
      next:()=>{
        this.dialogRef.close("true");
        this.close.emit();
      },
      error:()=>{
        this.dialogRef.close();
      }
    })}
  }

}
