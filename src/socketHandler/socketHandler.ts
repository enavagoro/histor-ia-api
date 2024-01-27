import { Server as SocketIOServer, Socket } from 'socket.io'
import { historySocketHandler } from '../entities/history/history.socket-handler';
import { commentSocketHandler } from '../entities/comment/comment.socket-handler';
import { imageSocketHandler } from '../entities/image/image.socket-handler';
import { paramSocketHandler } from '../entities/param/param.socket-handler';

export const startHandler = (io: SocketIOServer) => {
    io.on('connection', (socket: Socket) => {
        console.log('New socket connected:', socket.id);
        /****** logic to create rooms *****/    
        
        //create peer to peer comunication between individual node and server
        const direccionIPRemota = socket.handshake.address;
        console.log('Dirección IP remota:', direccionIPRemota);

        socket.join(socket.id);

        commentSocketHandler(io, socket)
        imageSocketHandler(io, socket)
        paramSocketHandler(io, socket)
        //
        historySocketHandler(io, socket)
        

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });
}