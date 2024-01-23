// Referencia del HTML (escritorio.html)
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTicket     = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search );

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error ('Error: El escritorio es requerido');
}

const desk = searchParams.get('escritorio');
lblEscritorio.innerText = desk;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;

});


socket.on('how-many-in-line', ( ticketsWaiting ) => {
    if (ticketsWaiting === 0) {
        lblPendientes.style.display = 'none'
    }
    else {
        lblPendientes.style.display = 'none'
        lblPendientes.innerText = ticketsWaiting;
    }
})

btnAtender.addEventListener( 'click', () => {

    socket.emit('who-is-next', { desk },  ( {ok, ticket, msg} ) => {
        if (!ok) {
            lblTicket.innerText = '*** Nadie en cola ***'
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = 'Ticket: ' + ticket.number;
    } )


});
