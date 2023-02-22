const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket)=>{
    
    // console.log('Cliente conectado',socket.id)
    
    // socket.on('disconnect',()=>{
    //     console.log('Cliente desconectado', socket.id);
    // });

    socket.emit('ultimo-ticket',ticketControl.ultimo);

    socket.on('siguiente-ticket', (payload,callback) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        //este metodo ayuda a que el se actualice el ticket
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);
        // callback(id);
        // //Para emitir un evento al cliente
        // //el io se utiliza en lugares muy especificos 
        // //broadcast es para mandarle el  mensaje de emit
        // // a todos los usuarios que esten conectados
        // socket.broadcast.emit('enviar-mensaje',payload);
    });
}

module.exports = {
    socketController
}