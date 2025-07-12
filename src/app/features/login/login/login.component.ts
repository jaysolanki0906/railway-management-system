import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';
import { login } from '../../../core/model/registermodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';
  callLoginApi:Subscription=new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth:AuthService,
    private token:TokenService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  loginWithGoogle(): void {
    alert('Google login clicked (dummy function)');
  }
  
  loginWithMicrosoft(): void {
    alert('Microsoft login clicked (dummy function)');
  }
  onSubmit(): void {
    console.log("submit is claickerd");
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const { email, password } = this.loginForm.value;
    const payload:login={email,password}
    this.callLoginApi=this.auth.login(payload).subscribe({
      next:(res:any)=>{
        this.token.saveTokens(res.access_token,res.refresh_token)
        this.router.navigate(['dashboard']);
        this.isLoading=false;
      },
      error:(err)=>{
        console.log('login error:',err);
        this.isLoading=false;
      }
    })
  }
  ngOnDestroy(): void {
      this.loginForm.reset();
      this.callLoginApi.unsubscribe();
  }
}