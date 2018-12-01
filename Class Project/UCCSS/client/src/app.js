import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 
    config.map([
      
      {
        route: ['', 'landing'],         // route name; square bracket is multiple ways to the route
        moduleId: './modules/landing',  // this is a view called home in the modules folder
        name: 'Landing',                // displayed in the menu
        auth: false
      },

      {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true 
      },

      {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users',
        auth: true 
      },

      {
        route: ['', 'helpTickets'],
        moduleId: './modules/helpTickets',
        name: 'Help Tickets',
        auth: true 
      }

    ]);
  }
}
