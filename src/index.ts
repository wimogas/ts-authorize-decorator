import 'reflect-metadata'
import http from 'http'
import app from './app'

const server = http.createServer(app);

server.listen(5000, () => {
    console.log("Server started in PORT 5000")
})