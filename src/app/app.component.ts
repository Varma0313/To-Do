import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { ToDoComponent } from './components/to-do/to-do.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  setCardTitle = 'My ToDo';
  ToggleToDoList: boolean = false;
  captureEvent(event: any) {
    console.log('Event', event);
  }

  title = 'to-do';

  currentView: 'todo' | 'register' = 'todo';

  showMenu = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = event.url === '/';
      }
    });
  }

  showAndHideToDo() {
    this.ToggleToDoList = !this.ToggleToDoList;
  }

  loadToDo() {
    this.currentView = 'todo';
  }

  LoadRegisterForm() {
    this.currentView = 'register';
  }
}
