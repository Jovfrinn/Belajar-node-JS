const mongoose = require('mongoose')
const { type } = require('os')
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// // Membuat Schema
// const Contact = mongoose.model('Contact', {
//     nama : {
//         type: String,
//         required: true
//     },
//     noHp : {
//         type: String,
//         required: true
//     },
//     email : {
//         type: String,
//     },
// })


// // Menambah 1 Data
// const contact1 = new Contact({
//     nama: 'dody',
//     noHp: '0134284021313',
//     email: 'dody@gmail.com'
// })

// simpan ke collection
// contact1.save().then((contact) => console.log(contact))