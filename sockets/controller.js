

const socketController = (socket)=>{
    
    console.log('Cliente conectado',socket.id)
    
    socket.on('disconnect',()=>{
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', (payload,callback) => {
        
        const id = '123456';
        callback(id);
        //Para emitir un evento al cliente
        //el io se utiliza en lugares muy especificos 
        //broadcast es para mandarle el  mensaje de emit
        // a todos los usuarios que esten conectados
        socket.broadcast.emit('enviar-mensaje',payload);
    });

}

module.exports = {
    socketController
}