import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
})
export class ToDoComponent implements OnInit, OnChanges {
  @Input() cardTitle!: string;
  @Output() sendToList = new EventEmitter<any>();

  addTask: string = '';
  toDo: string[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('initlize', 'onChanges');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges', changes);
  }

  addNewTask() {
    this.toDo.push(this.addTask);
    this.addTask = '';
    console.log('Check', this.toDo);
  }

  deleteNewTask(index: number) {
    this.toDo.splice(index, 1);
  }
}
