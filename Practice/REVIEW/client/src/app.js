export class App {
  configureRouter(config, router) {  // built into aurelia
    this.router = router;
    config.map([

      // route for home
      {
        route: ['', 'home'],   // quote with no space means it is the home route
        moduleId: './modules/home',
        name: 'Home'
      },

      // route for users
      {
        route: 'users',
        moduleId: './modules/users', // where the view is located
        name: ' Users'  // this will show up on the menu
      }
    ]);
  }
}
