export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      { 
	route: ['', 'foo'],
	 moduleId: './modules/foo',
	 name: 'Home' 
      }
    ]);
  }
}
