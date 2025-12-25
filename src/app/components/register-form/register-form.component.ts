import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { BehaviorSubject, from, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(public fb: FormBuilder, public api: ApiService) {}

  ngOnInit(): void {
    this.initialForm();
    this.registerForm.valueChanges.subscribe((d) =>
      console.log('Form Value', d)
    );

    this.registerForm.patchValue({
      email_mobile: 'es@scrutinysoft.com',
      password: 'Work@123',

      // username: 'ravi',
    });
  }

  initialForm() {
    this.registerForm = this.fb.group<any>({
      email_mobile: '',
      password: '',
      username: '',
    });
    this.sampleHotObservable();
    this.sampleColdObservable();
    this.exampleForReplaySubject();
  }

  register() {
    console.log('Register Form', this.registerForm.value);
    this.api
      .regiseter({
        email_mobile: this.registerForm.value.email_mobile,
        password: this.registerForm.value.password,
      })
      .subscribe((d) => {
        console.log('Response', d);
      });
  }

  sampleHotObservable() {
    // Hot observable is one which will emit values even if there is no subscriber
    const data$ = from([1, 2, 3, 4, 5]);
    data$.subscribe((d) => {
      console.log('data Hot', d);
    });
  }

  sampleColdObservable() {
    // Cold obsevable is one which will not emit until there is a subscriber
    let data$ = new Subject();
    // data$.next([1, 2, 3, 4, 5]);   It will give console error because no subscriber
    data$.subscribe((d) => {
      console.log('data cold', d);
    });
    data$.next([1, 2, 3, 4, 5]); // It will value only after subscription
  }

  exampleForReplaySubject() {
    let data$ = new ReplaySubject<any>(2); // This replay subject used to capture last n values of the observable and replay to new subscribers
    data$.next([1, 2, 3, 4, 'Test 1']);
    data$.next([1, 2, 3, 4, 'Test 2']);
    data$.next([1, 2, 3, 4, 'Test 3']);
    data$.next([1, 2, 3, 4, 'Test 4']);
    data$.next([1, 2, 3, 4, 'Test 5']);

    data$.subscribe((d) => {
      console.log(d, 'Testing');
    });
  }
}
