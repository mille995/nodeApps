import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class HelpTicket {

    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helpTickets';
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }

    async uploadFile(files, id) {
        await this.data.uploadFiles(files, this.HELP_TICKET_CONTENT_SERVICE + "/upload/" + id);
    }

    async activate() {
        this.helpTickets.getHelpTickets(this.userObj);
    }

    // getHelpTickets - slide 2 - deck 9
    async getHelpTickets(helpTicket) {
        console.log(this.userObj.role)
        let url = this.HELP_TICKET_SERVICE;
        if (this.userObj.role == 'user') {
            url += '/user/' + this.userObj._id;
        }
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpTicketsArray = response;
        } else {
            this.helpTicketsArray = [];
        }
    }


    // saveHelpTicket - put and post - slide 3 - deck 9
    async saveHelpTicket(helpTicket) {
        let serverResponse;
        if (helpTicket) {
            if (helpTicket.helpTicket._id) {
                serverResponse = await this.data.put(helpTicket, this.HELP_TICKET_SERVICE);
            } else {
                serverResponse = await this.data.post(helpTicket, this.HELP_TICKET_SERVICE);
            }
            return serverResponse;
        }
    }

    async delete(helpTicket) {
        if (helpTicket && helpTicket._id) {
            await this.data.delete(this.HELP_TICKET_SERVICE + '/' + helpTicket._id)
        }
    }
}