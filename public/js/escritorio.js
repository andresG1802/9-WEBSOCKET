
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');


const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio'))
{
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText=escritorio;

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