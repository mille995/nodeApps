import {inject} from 'aurelia-framework';  // analogous to require in node
import {Router} from 'aurelia-router';

@inject(Router)  // links the variable to the import
export class Home {
  constructor(router) {
	this.router = router;
          this.message = 'Home';
  }

  login(){
	  this.router.navigate('users');  // will invoke the users route
  }
}
