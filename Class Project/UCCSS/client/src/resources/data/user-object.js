import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class User {

    constructor(data) {
        this.data = data;
        this.USER_SERVICE = 'users';  // endpoint for the url /api/users
    }

    async saveUser(user) {
        if (user) {
            let serverResponse = await this.data.post(user, this.USER_SERVICE);
            return serverResponse;
        }
    }

    async getUsers() {
        let response = await this.data.get(this.USER_SERVICE);
        if (!response.error) {
            this.usersArray = response;
        } else {
            this.usersArray = [];
        }
    }

}
