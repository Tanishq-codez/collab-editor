import express from "express";
import{createServer} from "http"
import { Server } from "socket.io";
import { YSocketIO} from "y-socket.io/dist/server"

const app = express();
// express instance wrapped in an http server for socketio to work on 
const httpServer = createServer(app);

// adding socket io to our http server
const io = new Server(httpServer , {
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

// ySocketIO wraps socketio in yjs (RTDS)
const ySocketIO = new YSocketIO(io)
ySocketIO.initialize() ;

// health check routes for aws dashboard 
app.get("/" , (req,res)=>{
    res.status(200).json({
        message:"hello people",
        success: true
    })
})
app.get("/health" , (req,res)=>{
   res.status(200).json(
    {
        message:"Ok",
        success:true 
    }
   )
})

httpServer.listen(8001 , ()=>{
    console.log("server is running on port 8001") ;
})