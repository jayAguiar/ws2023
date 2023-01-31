const express = require('express');
const hbs = require('hbs');

const { Server } = require('ws');

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

const sockserver = new Server({ port: 443 });

app.get('/home',(req, res)=>{
    console.log(`boo`)
    res.render('home.hbs');
})

var peeps =[]
app.post('/room',(req, res)=>{
    if(peeps.length < 4)
    {
        peeps.push(req.body.user)
    }
    console.log(sockserver.clients)
    res.render('room.hbs');
}) 


/*setInterval(()=>
        sockserver.clients.forEach((client) => {
          
        const data = JSON.stringify({'name': peeps});
        client.send(data);
    }), 
    1000);*/

sockserver.on('connection', (ws) => {
   console.log('New client connected!'); 
   sockserver.clients.forEach((client) => {
    const data = JSON.stringify({'name': peeps});
    client.send(data);})
   ws.on('close', () => console.log('Client has disconnected!'));
});
 




  



app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
})

