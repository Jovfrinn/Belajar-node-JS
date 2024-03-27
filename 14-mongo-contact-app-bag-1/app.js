const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000


// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts)
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

// Halaman Home
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


app.listen(port, () => {
    console.log(`Mongo Contact App | Listening at http://localhost:${port}`)
})

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman about',
        layout: 'layouts/main-layout'
    });
});

// Halaman Contact 
app.get('/contact', async (req, res) => {

    // Contact.find().then((contact) => {
    //     res.send(contact)
    // })

    const contacts = await Contact.find();
    res.render('contact',{
        title: 'Halaman contact',
        layout: 'layouts/main-layout',
        contacts,
        msg:req.flash('msg'),
    });
});

// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama : req.params.nama});
    res.render('detail',{
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});




