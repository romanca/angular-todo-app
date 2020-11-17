import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TodosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes ), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
