import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class NavBar {
    constructor(router) {
        this.router = router;
        this.authenticated = false;
        this.email = "";
        this.password = "";
    }
    // runs after the browser builds the html
    // uses jQuery from bootstrap.  Makes menu items respond to clicks
    attached() {
        $('.navbar-nav a').on('click', function () {
            $('.navbar-nav').find('li.active').removeClass('active');
            $(this).parent('li').addClass('active');
        });
    }

    login() {
        console.log(this.email);
        console.log(this.password);
        this.authenticated = true;
        this.router.navigate('home');
    }

    logout() {
        this.authenticated = false;
        this.router.navigate('landing');
    }

}
