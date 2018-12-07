import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'


@inject(Router, User)
export class Users {
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'Users';
    this.showUserEditForm = false;
  }

  // activate runs when you first load the page
  async activate() {
    await this.getUsers();
  }

  attached() {
    feather.replace() // will draw feather icons
  }

  async getUsers() {
    await this.users.getUsers();
  }

  newUser() {
    this.user = {
      firstname: "",
      lastname: "",
      active: true,
      role: "user",
      email: "",
      password: ""
    }
    this.openEditForm();
  }

  openEditForm() {
    this.showUserEditForm = true;
    setTimeout(() => { $("#firstname").focus(); }, 500);
    // modified from the class value of firstName
  }

  editUser(user) {
    this.user = user;
    this.openEditForm();
  }

  changeActive(user) {
    this.user = user;
    this.save();
  }

  async save() {
    if (this.user && this.user.firstname && this.user.lastname
      && this.user.email && this.user.password)
      await this.users.saveUser(this.user);
    await this.users.getUsers();
    this.back();

  }

  back() {
    this.showUserEditForm = false;
  }

  async delete() {
    if (this.user) {
      await this.users.delete(this.user);
      await this.getUsers();
      this.back();
    }
  }
}

