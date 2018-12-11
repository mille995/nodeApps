export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      { 
	route: ['', 'todos'],
	 moduleId: './modules/todo',
	 name: 'Home' 
      }
    ]);
  }
}
