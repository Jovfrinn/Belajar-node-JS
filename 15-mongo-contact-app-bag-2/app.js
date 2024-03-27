const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')


require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

const {body, validationResult, check, Result} = require('express-validator')
app.use(methodOverride('_method'))

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
// halaman form tambah data contact
app.get('/contact/add',(req,res) => {
    res.render('add-contact',{
        title: 'Form tambah data contact',
        layout: 'layouts/main-layout',

    })
});

// Proses tambah data contact
app.post('/contact', [
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({nama : value});
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
       Contact.insertMany(req.body, (error,result) => {
           // kirimkan flash message
           req.flash('msg','data contact berhasil di tambahkan!')
           res.redirect('/contact')
       })
    }
});

// proses delete contact
// app.get('/contact/delete/:nama', async(req,res) => {
//     const contact = await Contact.findOne({nama: req.params.nama});
//     // Jika contact tidak ada
//     if(!contact){
//         res.status(404);
//         res.send('<h1>404</h1>')
//     } else {
//         Contact.deleteOne({_id: contact._id}).then((err,result) => {
//             req.flash('msg','data contact berhasil di hapus!')
//             res.redirect('/contact')
//         })
//     }
// })

app.delete('/contact', (req,res) => {
    Contact.deleteOne({nama: req.body.nama}).then((err,result) => {
    req.flash('msg','data contact berhasil di hapus!')
    res.redirect('/contact')
    })
})

// form ubah data contact
// halaman form ubah data contact
app.get('/contact/edit/:nama', async (req,res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
    res.render('edit-contact',{
        title: 'Form Ubah data contact',
        layout: 'layouts/main-layout',
        contact,
    })
})

// proses ubah data
app.put('/contact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({nama: value});
        if(value !== req.body.oldNama && duplikat){
          throw new Error('Nama Contact Sudah digunakan')
        }
        return true
    }),
    check('email','Email Tidak Valid').isEmail(),
    check('noHp', 'Nomor Hp Tdak Valid').isMobilePhone('id-ID')
    ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('edit-contact',{
            title: 'Form Ubah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body,
           })
    } else {
        Contact.updateOne(
        { nama: req.body.oldNama},
        {
            $set: {
                nama: req.body.nama,
                email: req.body.email,
                noHp: req.body.noHp,
            }
        }
        ).then((result) => {
            // kirimkan flash message
            req.flash('msg','data contact berhasil di ubah!')
            res.redirect('/contact')
        })
    }
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




