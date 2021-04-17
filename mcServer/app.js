const express=require('express')
const http=require('http')
const app=express();
const server=http.createServer(app)
const io=require('socket.io')(server)
var num=0;
var sockets={}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.all('*', (req, res,next) => {
   
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS');
    // res.header('Access-Control-Allow-Credentials','true');
    next()    
  });
  app.get('/', (req, res) => {
    console.log(req.url)
    res.sendFile(__dirname + '/index.html');
  });

//   收到提交订单
  // app.post('/order', (req, res) => {
  //      res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        
  //       sockets[req.body.name].emit('order',Object.assign({order:num},req.body) )

  //           res.write(num.toString());
  //           num++;
  //           res.end();
  // });

io.on('connection',(socket)=>{

  // io.emit('chat message', 'MES');
  let  name=socket.handshake.query.name
  sockets[name]=socket;

  socket.on('order',(res)=>{

    sockets['user'+res.name]=socket;
    if( sockets[res.name]){
      sockets[res.name].emit('order',res)
    }

    console.log('order',res)
  })

  socket.on('accept',(res)=>{
  
    sockets['user'+res.name].emit('done',res.num)
  
  })

  
})

server.listen(3000)