import { Server as SocketIOServer, Socket } from 'socket.io'
import { getComments, addComments } from './comment.dao'
// import { resetKey } from '../../shared/services/redis.service'

export const commentSocketHandler = async (io: SocketIOServer, socket: Socket) => {
  socket.on('getComments', async (_) => {
    // await resetKey('comments')
    const comments = await getComments();
    socket.emit('comments', comments)// Aquí puedes procesar los datos o responder al cliente si es necesario
  })

  socket.on('addComment', async (data) => {
    await addComments(data)
    const comments = await getComments();
    io.emit('comments', comments)// Aquí puedes procesar los datos o responder al cliente si es necesario
  })
}