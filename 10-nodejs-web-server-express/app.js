const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
//   res.send('Hello World!')
    res.sendFile('./index.html', {root: __dirname})
});

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname})
});

app.get('/contact', (req, res) => {
//   res.send('Ini adalah halaman contact!')
res.sendFile('./contact.html', {root: __dirname})
});

// request
app.get('/product/:id/', (req,res) => {
    res.send(`Product ID: ${req.params.id} <br> Category ID: ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404)
    res.send(('<h1> 404 </h1>'));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})















// const http = require('http');
// const fs = require('fs');
// const port = 3000;
// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if(err){
//             res.writeHead('404');
//             res.write('Error: File Not Found');
//         } else{
//             res.write(data);
//         }
//         res.end();
//     });
// }

// const server = http.createServer((req,res) => {
//     res.writeHead(200,{
//         'Content-Type': 'text/html'
//     });
//     const url = req.url;
//     if(url === '/about'){
//        renderHTML('./about.html',res);
//     } else if (url === '/contact'){
//         renderHTML('./contact.html',res);
//     } else{
//         renderHTML('./index.html',res);
//     }
  
// });

// server.listen(port, () => {
//     console.log(`Server is listening port ${port}..`)
// })