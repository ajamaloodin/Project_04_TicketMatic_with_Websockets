const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController =  (socket) => {

    // Estos eventos se disparan cuando un nuevo cliente se conecta
    socket.emit( 'last-ticket', ticketControl.lastOne);
    socket.emit( 'show-last-four', ticketControl.last4);
    socket.emit( 'how-many-in-line', ticketControl.tickets.length);

    socket.on('next-ticket',  ( payload, callback ) => {
        
        const nextTicket = ticketControl.nextTicket();
        callback( nextTicket );
        socket.broadcast.emit( 'how-many-in-line', ticketControl.tickets.length);

    } )

    socket.on('who-is-next', ( {desk}, callback ) => {

        if (!desk) {
            return callback({
                ok : false,
                msg: 'Error: El escritorio es requerido'
            });
        }

        const ticket = ticketControl.serveTicket( desk );

        socket.broadcast.emit( 'show-last-four', ticketControl.last4);
        socket.emit( 'how-many-in-line', ticketControl.tickets.length);
        socket.broadcast.emit( 'how-many-in-line', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok : false,
                msg: 'No hay tickets para atender'
            });
        }
        else {
            return callback({
                ok : true,
                ticket
            });
        }


    });

  }


module.exports = {
    socketController
}