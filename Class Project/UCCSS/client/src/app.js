export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      
      {
        route: ['', 'landing'],         // route name; square bracket is multiple ways to the route
        moduleId: './modules/landing',  // this is a view called home in the modules folder
        name: 'Landing'                 // displayed in the menu
      },

      {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home'
      },

      {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users'
      },

      {
        route: ['', 'helpTickets'],
        moduleId: './modules/helpTickets',
        name: 'Help Tickets'
      }

    ]);
  }
}
