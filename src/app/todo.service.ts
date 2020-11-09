import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';

 
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public show:boolean = false;


  private URL1 = 'http://localhost:4000/local';
  private URL2 = 'http://localhost:4000/local/add';
  private URL3 = 'http://localhost:4000/local/update';

  constructor(private http: HttpClient) { }   

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.URL1);
  }

   addTodo(todo: Todo ): Observable<Todo> {
    return this.http.post<Todo>(this.URL2, todo) 
  }
  
  deleteTodo(todo:Todo | number): Observable<Todo>{
    const _id = typeof todo === 'number' ? todo : todo._id;
    const url = `${this.URL1}/${_id}`;

  return this.http.delete<Todo>(url, this.httpOptions)
  }

  updateTodo(todo: Todo): Observable<any> {
    const _id = typeof todo === 'number' ? todo : todo._id; 
    const url = `${this.URL3}/${_id}`
    console.log(url)
    return this.http.post(url, todo, this.httpOptions) 
  }
}
