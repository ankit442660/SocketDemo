const express=require("express");
const { Server }=require("socket.io");

const path=require("path");
const http=require("http");
const cors=require("cors");
const app=express();
const server =http.createServer(app);
const io= new Server(server,{
  cors:{
    origin:"*",
    credentials:true,
  }
});
app.get('/',(req,res)=>{
  res.send("Hello world");

})
io.on("connection",(socket)=>{
  console.log("a user connected",socket);
  socket.on("chat",(payload)=>{
    console.log("What is payload",payload);
    io.emit("chat", payload);
  })
});



server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });


