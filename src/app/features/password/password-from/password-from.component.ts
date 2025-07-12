import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-from',
  standalone:false,
  templateUrl: './password-from.component.html',
  styleUrls: ['./password-from.component.scss']
})
export class PasswordFromComponent implements OnDestroy {
  changePasswordForm!: FormGroup;
  hideOld = true;
  hideNew = true;
  hideConfirm = true;
  apiUnsubscribe: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialogRef: MatDialogRef<PasswordFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('new_password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notMatching: true };
  }

  get oldPassword() { return this.changePasswordForm.get('old_password'); }
  get newPassword() { return this.changePasswordForm.get('new_password'); }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }

  ngOnDestroy(): void {
    this.apiUnsubscribe.unsubscribe();
    this.changePasswordForm.reset();
  }

  onSubmit() {
    if (!this.changePasswordForm.valid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    const payload = {
      old_password: this.changePasswordForm.value.old_password,
      new_password: this.changePasswordForm.value.new_password
    };
    console.log("this is payload", payload);
    this.apiUnsubscribe = this.auth.changePassword(payload).subscribe({
      next: (res) => {
        console.log("password changed", res);
        this.dialogRef.close();
      },
      error: (err: any) => {
        console.log("error from password change", err);
        this.ngOnDestroy();
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
