const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts)

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname})
    const mahasiswa = [
        {
            nama: 'Sandhika',
            email: 'sandhika@gmail.com'
        },
        {
            nama: 'Jovfrin',
            email: 'jovfrin@gmail.com'
        },
        {
            nama: 'Anjay',
            email: 'anjay@gmail.com'
        },
    ]
    res.render('index', {
        nama: 'Jovfrin',
        title: 'Halaman Home',
        mahasiswa,
        layout: 'layouts/main-layout',
        
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman about',
        layout: 'layouts/main-layout'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact',{
        title: 'Halaman contact',
        layout: 'layouts/main-layout'
    });
});

// request
app.get('/product/', (req,res) => {
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