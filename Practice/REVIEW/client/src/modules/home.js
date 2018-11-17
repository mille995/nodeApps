import {inject} from 'aurelia-framework';  // analogous to require in express
import {Router} from 'aurelia-router';

@inject(Router)             
export class Home {
  constructor(router) {
	this.router = router;
          this.message = 'Home';
  }

  login(){                                  // function that uses navigate method to invoke the 'users' route
	  this.router.navigate('users');
  }
}
