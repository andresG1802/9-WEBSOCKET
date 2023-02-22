const lblNuevotTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');



const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

   btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true
});

socket.on('ultimo-ticket',(ultimo)=>{
    
    lblNuevotTicket.innerHTML = 'Ticket '+ ultimo;
});

btnCrear.addEventListener( 'click', () => {

    socket.emit('siguiente-ticket', null, ( ticket) => {
        lblNuevotTicket.innerHTML = ticket;
    });

});