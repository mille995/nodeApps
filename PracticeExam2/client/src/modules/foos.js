import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Foo } from '../resources/data/foo-object'


@inject(Router, Foo)
export class Foos {
  constructor(router, foos) {
    this.router = router;
    this.foos = foos;
    this.message = 'Foos';
    this.showFooEditForm = true;
  }

  // activate runs when you first load the page
  async activate() {
    await this.getFoos();
  }

  attached() {
    feather.replace() // will draw feather icons
  }

  async getFoos() {
    await this.foos.getFoos();
  }

  newFoo() {
    this.foo = {
      foo: "",
      woo: "",
    }
    this.openEditForm();
  }

  openEditForm() {
    this.showFooEditForm = true;
    setTimeout(() => { $("#firstname").focus(); }, 500);
    // modified from the class value of firstName
  }

  editFoo(foo) {
    this.foo = foo;
    this.openEditForm();
  }

  changeActive(foo) {
    this.foo = foo;
    this.save();
  }

  async save() {
    if (this.foo && this.foo.foo && this.foo.woo)
      await this.foo.saveFoo(this.foo);
    await this.foo.getFoos();
    this.back();

  }

  back() {
    this.showFooEditForm = false;
  }

  async delete() {
    if (this.foo) {
      await this.foos.delete(this.foo);
      await this.getFoos();
      this.back();
    }
  }
}
