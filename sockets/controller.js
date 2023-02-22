const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket)=>{
    
    // console.log('Cliente conectado',socket.id)
    
    // socket.on('disconnect',()=>{
    //     console.log('Cliente desconectado', socket.id);
    // });

    socket.emit('ultimo-ticket',ticketControl.ultimo);
    socket.emit('estado-actual',ticketControl.ultimos4);
    
    socket.emit('tickets-pendiestes',ticketControl.tickets.length);
    
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

    socket.on('atender-ticket',({escritorio},callback)=>{
        if(!escritorio)
        {
            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual',ticketControl.ultimos4);
        socket.emit('tickets-pendiestes',ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendiestes',ticketControl.tickets.length);
    
        if(!ticket)
        {
            callback({
                ok:false,
                msg:'Ya no hay tickets pendientes'
            });
        }
        else
        {
            callback({
                ok:true,
                ticket
            });
        }

    });

}

module.exports = {
    socketController
}