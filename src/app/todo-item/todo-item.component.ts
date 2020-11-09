import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent   {
  @Input() todo: Todo;
  @Output() remove: EventEmitter<Todo> = new EventEmitter();

  isShowDiv = false;
  todos: Todo[];
  


  constructor(private todoService: TodoService) {}
   
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  saveTodo(todo: Todo): void {
    this.todoService.updateTodo(todo)
      .subscribe(()=> this.toggleDisplayDiv());
  }
  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos);
  }

  removeItem() {
    this.remove.emit(this.todo);
  }

  // deleteTodo(todo: Todo): void {
  //   this.todos = this.todos.filter(i => i !== todo);
  //   this.todoService.deleteTodo(todo).subscribe();
  // }
}
// deleteHero(hero: Hero): void {
//   this.heroes = this.heroes.filter(i => i !== hero);
//   this.heroService.deleteHero(hero).subscribe();
// }