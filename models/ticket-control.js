const path = require('path');
const fs = require('fs');

class Ticket {

        constructor ( number, desk ) {
            this.number = number;
            this.desk   = desk;
        }
}

class TicketControl {

    constructor() {

        this.lastOne = 0;
        this.today   = new Date().getDate();
        this.tickets = [];
        this.last4   = [];

        this.init();
    }

    get toJson() {
        return {
            last    : this.lastOne, 
            today   : this.today,
            tickets : this.tickets,
            last4   : this.last4     
        }
    }

    init() {
        
        const { today, last, tickets, last4 } = require('../db/data.json');
        
        if (today === this.today) {
            this.lastOne  = last; 
            this.tickets  = tickets;
            this.last     = last4;     
        }
        else {
            this.saveDB();
        }
        
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify( this.toJson ));
    }

    nextTicket() {
        this.lastOne += 1;
        const ticket = new Ticket(this.lastOne, null);
        this.tickets.push( ticket );

        this.saveDB();
        return 'Ticket: ' + ticket.number;
    }

    serveTicket( desk ) {

        if ( this.tickets.length === 0 ) {
            //No hay tickets en cola.
            return null;
        }

        //Toma el primer ticket y lo elimina de la cola
        const ticket = this.tickets.shift(); //this.tickets[0];
        ticket.desk = desk;

        //Agregar este ticket al arreglo de los ultimos 4 para que 
        //aparezca de primero
        this.last4.unshift( ticket );

        if ( this.last4.length > 4 ) {
            //de esta lista de los ultimos 4, elimino el último
            this.last4.splice(-1, 1);
        }

        this.saveDB();

        return ticket;

    }

}

module.exports = TicketControl;