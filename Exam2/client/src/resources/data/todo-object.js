import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class ToDo {

    constructor(data) {
        this.data = data;
        this.TODO_SERVICE = 'todos';  // endpoint for the url /api/users
    }


    async saveTodo(todo) {
        let serverResponse;
        if (todo) {
            if (todo._id) {
                serverResponse = await this.data.put(todo, this.TODO_SERVICE);
            } else {
                serverResponse = await this.data.post(todo, this.TODO_SERVICE);
            }
            return serverResponse;
        }
    }

    async getTodos() {
        let response = await this.data.get(this.TODO_SERVICE);
        if (!response.error) {
            this.todosArray = response;
        } else {
            this.todosArray = [];
        }
    }


    async delete(todo) {
        if (todo && todo._id) {
            await this.data.delete(this.TODO_SERVICE + '/' + todo._id)
        }
    }


}
