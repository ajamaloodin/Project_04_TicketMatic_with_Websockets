// Referencias HTML

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const lblastTicket = document.querySelector('#lblastTicket');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;

});

socket.on('last-ticket', (lastTicket) => {
    lblNuevoTicket.innerText = 'Ticket ' + lastTicket;
})


btnCrear.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});
