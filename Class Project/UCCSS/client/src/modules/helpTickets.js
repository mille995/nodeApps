import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HelpTicket } from '../resources/data/help-ticket-object'


@inject(Router, HelpTicket)
export class HelpTickets {

    constructor(router, helpTickets) {
        this.router = router;
        this.helpTickets = helpTickets;
        this.message = 'HelpTickets';
        this.showEditForm = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }

    // // // slide 4 - Aurelia HelpTickets
    // constructor(helpTicket){
    //     this.helpTickets = helpTicket;
    //     this.showEditForm = false;
    //     this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    //     }
        
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

    async getHelpTicketContent() {
        await this.helpTickets.getHelpTicketContent();
    }

    newHelpTicket() {
        var userId = this.userObj._id
        this.helpTicket = {
            title: "",
            personId: userId,
            ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
            status: 'new'
        };
        this.helpTicketContent = {
            personId: userId,
            content: ""
        };
        this.openEditForm();
    }

    openEditForm() {
        this.showEditForm = true;
        setTimeout(() => { $("#title").focus(); }, 500);
        // modified from the class value of firstName
    }

    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketContent(helpTicket._id)
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
            let serverResponse = await this.helpTickets.saveHelpTicket(helpTicket);
            if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse.contentID);
            await this.getHelpTickets();
            this.back();

        }
    }

    back() {
        this.showEditForm = false;
        this.filesToUpload = new Array();
        this.files = new Array();
    }

    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if (item.name === this.files[i].name) addFile = false;
            })
            if (addFile) this.filesToUpload.push(this.files[i]);
        }
    }


    // to delete a helpticket, 
    // you will also need to delete the related content

}