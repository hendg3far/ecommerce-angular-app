import { Component } from '@angular/core';
import { AuthRoutingModule } from "../auth-routing.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthStorageService } from '../../../core/services/auth/auth-storage.service';
import { RegisterRequest } from '../../../core/models/auth/register-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthRoutingModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storage: AuthStorageService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      phone: ['', Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)],
    }, { validators: this.passwordMatchValidator })
  }


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.error = null;

    const registerData: RegisterRequest = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      rePassword: this.registerForm.value.rePassword,
      phone: this.registerForm.value.phone,
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        if (this.registerForm.value.remember) {
          this.storage.setToken(response.token);
        }

        this.storage.setUser(response.user);
        this.storage.setToken(response.token);
        this.router.navigate(['/account']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please try again.';
        this.loading = false;

        console.log(err);
      },
      complete: () => (this.loading = false),
    });
  }
}
