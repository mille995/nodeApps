// config.globalResources - anything in here can be used anywhere in the application
// this creates an html element called nav-bar

export function configure(config) {
  config.globalResources([
    './elements/nav-bar'
  ]);
}
