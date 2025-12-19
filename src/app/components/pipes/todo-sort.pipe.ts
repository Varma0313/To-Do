import { Pipe, PipeTransform } from '@angular/core';
import { IToDo } from '../interface/to-do-interface';

@Pipe({
  name: 'todoSort',
  standalone: true,
})
export class TodoSortPipe implements PipeTransform {
  transform(value: any, sortBy?: 'completed' | 'created' | null): any {
    console.log('check Value', value);
    if (!sortBy) return this.sortByTimeDesc(value);
    if (sortBy === 'completed') return this.SortByCompleted(value);
    if (sortBy === 'created') return this.sortByCreated(value);
    if (sortBy) return [];
    return value;
  }

  sortByTimeDesc(arr: IToDo[]) {
    return arr.sort((a: IToDo, b: IToDo) => {
      return a.time - b.time;
    });
  }

  SortByCompleted(arr: IToDo[]) {
    let completedCollection: IToDo[] = [];
    let nonCompletedCollection: IToDo[] = [];
    completedCollection = arr.filter((item) => item.isCompleted);
    nonCompletedCollection = arr.filter((item) => !item.isCompleted);
    return [...nonCompletedCollection, ...completedCollection];
  }

  sortByCreated(arr: IToDo[]) {
    return arr.sort((a: IToDo, b: IToDo) => {
      return a.time - b.time;
    });
  }
}
