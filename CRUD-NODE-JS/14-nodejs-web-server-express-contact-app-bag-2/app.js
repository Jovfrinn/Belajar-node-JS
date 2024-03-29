const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact,findContact, addContact, cekDuplikat} = require('./utils/contact')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');
// Third-Party Middleware
app.use(expressLayouts)

// built in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())

app.get('/', (req, res) => {
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
    const contacts = loadContact();
    res.render('contact',{
        title: 'Halaman contact',
        layout: 'layouts/main-layout',
        contacts,
        msg:req.flash('msg'),
    });
});

// halaman form tambah data contact
app.get('/contact/add',(req,res) => {
    res.render('add-contact',{
        title: 'Form tambah data contact',
        layout: 'layouts/main-layout',

    })
});

// Proses data contact
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat){
          throw new Error('Nama Contact Sudah digunakan')
        }
        return true
    }),
    check('email','Email Tidak Valid').isEmail(),
    check('noHp', 'Nomor Hp Tdak Valid').isMobilePhone('id-ID')
    ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('add-contact',{
            title: 'Form Tambah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
           })
    } else {
        addContact(req.body)
        // kirimkan flash message
        req.flash('msg','data contact berhasil di tambahkan!')
        res.redirect('/contact')
    }
});


// halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail',{
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});


app.use( (req, res) => {
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