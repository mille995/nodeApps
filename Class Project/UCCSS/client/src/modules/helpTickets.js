import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HelpTicket } from '../resources/data/help-ticket-object'


@inject(Router, HelpTicket)
export class HelpTickets {
    constructor(router, helpTickets) {
        this.router = router;
        this.helpTickets = helpTickets;
        this.message = 'HelpTickets';
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
        this.showEditForm = false;
    }

    // activate runs when you first load the page
    async activate() {
        await this.helpTickets.getHelpTickets(this.userObj);
    }

    attached() {
        feather.replace() // will draw feather icons
    }

    async getHelpTickets() {
        await this.helpTickets.getHelpTickets();
    }

    async getHelpTicketsContent(){
        await this.helpTickets.getHelpTicketContent();
    }

    newHelpTicket() {
        var userid = sessionStorage.getItem('userObj.id');
        this.helpTicket = {
            title: "",
            personId: "userid",
            ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
            status: 'new'
        };
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        this.openEditForm();
    }

    openEditForm() {
        this.showEditForm = true;
        setTimeout(() => { $("#title").focus(); }, 500);
        // modified from the class value of firstName
    }

    async editHelpTicket(helpTicket){
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
        personId: this.userObj._id,
        content: ""
        };
        await this.helpTickets.getHelpTicketsContent(helpTicket._id)
        this.openEditForm();
    }

    changeActive(helpTicket) {
        this.helpTicket = helpTicket;
        this.save();
    }



    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerId = this.userObj._id;
            }
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets();
            this.back();
        }
    }

    back() {
        this.showEditForm = false;
    }

    // to delete a helpticket, 
    // you will also need to delete the related content

}