import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { connectToRedis } from './shared/services/redis.service';
import { startHandler } from './socketHandler/socketHandler';

import * as dotenv from 'dotenv';
dotenv.config();

try {
    const app: express.Application = express();
    const port: number | string = process.env.PORT || 3000;

    app.set('port', port);
    app.use(cors());
    app.use(express.json());

    app.get('/', (_, res)=>{
        res.send({message: 'Room server running'});
    });

    const server = http.createServer(app);
    const io = new SocketIOServer(server, {cors: {origin: '*',}});

    connectToRedis();
    startHandler(io);

    server.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
} catch (err) {
    console.log('Error in server configuration');
};
