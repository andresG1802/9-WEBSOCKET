const express = require('express');
const cors  = require('cors');
const { socketController } = require('../sockets/controller');
class Server{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT||8080;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        

        this.paths = {
            usuarios:'/api/usuarios',
            buscar:'/api/buscar',
            auth:'/api/auth',
            categorias:'/api/categorias',
            productos:'/api/productos',
            uploads:'/api/uploads'
        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // this.categoriasPath = '/api/categorias';
        
        
        
        //Middlewares
        //Los middlewares son funciones
        //que se ejecutan cuando se lanze el 
        //servidor
        
        this.middlewares();
        
        this.routes();

        this.sockets();
        
    }

   

    middlewares()
    {
        //CORS
        this.app.use(cors());
        
        //Lectura y parseo del body
        
        //Directorio publico
       this.app.use(express.static('public')); 
       
    }
    routes()
    {
       
    }
    sockets()
    {
        this.io.on('connection', socketController);
    }
    listen()
    {
        this.server.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });
    }
}
module.exports = Server;