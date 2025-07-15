import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone:false,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit{
  userForm: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder,private user:UserService) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: ['', Validators.required]
    });
  }
  ngOnInit()
  {
    this.user.getProfile().subscribe({
      next:(res)=>{
        console.log(res);
        this.userForm.setValue({
          firstName:res.first_name,
          lastName:res.last_name,
          gender:res.gender,
          dateOfBirth:res.dateofbirth
        })
      }
    })
  }
}
