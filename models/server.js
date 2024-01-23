
const express              = require('express');
const cors                 = require('cors');
const { log }              = require('console');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);
        this.paths  = {}
        // Middlewares
        this.middlewares();
        // Rutas de la app
        this.routes();
        // Eventos de Sockets
        this.sockets();
    }

    middlewares () {

        //CORS
        this.app.use(cors());

        this.app.use( express.static('public'));
        
    }

    routes() {

        /* this.app.use(this.paths.auth, require('../routes/auth_routes')); */
        }

    sockets() {
        this.io.on('connection', socketController );
    }

    listen() {
        this.server.listen(this.port,  () => {
            console.log(`Server is running on port ${this.port}`);
        } );
    }
}

module.exports = Server;