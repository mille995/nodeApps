export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'home'],         // route name
        moduleId: './modules/home',  // this is a view called home in the modules folder
        name: 'Home'                 // displayed in the menu
      },
      {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users'
      }
    ]);
  }
}
