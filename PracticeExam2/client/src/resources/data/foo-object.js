import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Foo {

    constructor(data) {
        this.data = data;
        this.FOO_SERVICE = 'foo';  // endpoint for the url /api/users
    }

    async saveFoo(foo) {
        let serverResponse;
        if (foo) {
            if (foo._id) {
                serverResponse = await this.data.put(foo, this.FOO_SERVICE);
            } else {
                serverResponse = await this.data.post(foo, this.FOO_SERVICE);
            }
            return serverResponse;
        }
    }


    async getFoos() {
        let response = await this.data.get(this.FOO_SERVICE);
        if (!response.error) {
            this.foosArray = response;
        } else {
            this.foosArray = [];
        }
    }

    async delete(foo) {
        if (foo && foo._id) {
            await this.data.delete(this.FOO_SERVICE + '/' + foo._id)
        }
    }


}
