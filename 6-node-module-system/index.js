// console.log("Hello Jovfrin");
// const nama = "Jovfrin Joiner";
// const cetakNama = nama => `Hai nama saya ${nama}`
// console.log(cetakNama(nama));

// di node tidak ada
// console.log(window)

// const fs = require('fs') //core module
// const cetakNama = require('./coba') //local module
// const moment = require('moment') //third  party module / npm module / node_modules


const coba = require('./coba')

// console.log(coba)
coba.cetakNama('Jovfrin')
console.log(coba.PI, coba.mahasiswa.cetakMhs(), new coba.Orang())





































