import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShoppingApiService } from '../services/shopping-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  imgSrc =
    'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  loginForm!: FormGroup;

  loginApi: any;

  constructor(
    private fb: FormBuilder,
    private shoppingAPI: ShoppingApiService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.loginForm.valueChanges.subscribe(console.log);
    this.loginForm.patchValue({
      email: 'srini@gmail.com',
      password: '123SD',
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
    });
  }

  login() {
    this.loginApi = this.shoppingAPI.login(this.loginForm.value).subscribe(
      (data) => {
        console.log('Login Success:', data);
      },
      (error) => {
        console.error('Login Failed:', error);
      }
    );
  }
}
