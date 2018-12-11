import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ToDo } from '../resources/data/todo-object'


@inject(Router, ToDo)
export class Todos {
  constructor(router, todos) {
    this.router = router;
    this.todos = todos;
    this.message = 'Todos';
    this.showTodoEditForm = true;
  }

  // activate runs when you first load the page
  async activate() {
    await this.getTodos();
  }

  attached() {
    feather.replace() // will draw feather icons
  }

  async getTodos() {
    await this.todos.getTodos();
  }

  newTodo() {
    this.todo = {
      todo: "",
      priotity: "",
      done: ""
    }
    this.openEditForm();
  }

  openEditForm() {
    this.showTodoEditForm = true;
    setTimeout(() => { $("#todo").focus(); }, 500);
    // modified from the class value of firstName
  }

  editTodo(todo) {
    this.todo = todo;
    this.openEditForm();
  }

  changeActive(todo) {
    this.todo = todo;
    this.save();
  }

  async save() {
   if (this.todo && this.todo.todo && this.todo.priotity)
      await this.todos.saveTodo(this.todo);
    await this.todos.getTodos();
    this.back();

  }

    back() {
    this.showTodoEditForm = false;
  }

  async delete() {
    if (this.todo) {
      await this.todos.delete(this.todo);
      await this.getTodos();
      this.back();
    }
  }
}
