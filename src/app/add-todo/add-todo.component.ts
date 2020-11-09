import { Component, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todos: Todo[];
   todo: Todo;
   
  constructor(private todoService: TodoService) {}

  addTodos(name: string): void {
    name = name.trim();
    this.todoService.addTodo({ name } as Todo)
    .subscribe(todo => this.todos.push(todo));
  }

  ngOnInit(): void {
  }

}
