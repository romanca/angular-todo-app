import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  todo: Todo;
  isShowDiv = false;
  
  constructor(private todoService: TodoService) {}

  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos);
  }
  
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  saveTodo(todo: Todo): void {
    this.todoService.updateTodo(todo)
      .subscribe(()=> this.toggleDisplayDiv());
  }
  
  addTodos(name: string): void {
    name = name.trim();
    this.todoService.addTodo({ name } as Todo)
    .subscribe(todo => this.todos.push(todo));
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(i => i !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }
  
  ngOnInit() {this.getTodos();}

}
