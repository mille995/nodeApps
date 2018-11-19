// model that defines the schema

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var HelpTicketContentSchema = new Schema({
    personId: {type: Schema.Types.ObjectId},
    helpTicketId: {type: Schema.Types.ObjectId},
    content:{type: String},
    dateCreated: {type: Date, default: Date.now},
    file: {
        filename: {type: String},
        originalFilename:{type: String},
    }
});

module.exports = Mongoose.model('HelpTicketContent', HelpTicketContentSchema);

var HelpTicketSchema = new Schema({
    title: {type: String, require: true},
    personId: {type: Schema.Types.ObjectId},
    ownerId: {type: Schema.Types.ObjectId},
    status: {type: String, require: true, enum: ['new', 'inProcess', 'closed']},
    dateCreated: {type: Date, default: Date.now},
});


module.exports = Mongoose.model('HelpTicket', HelpTicketSchema);