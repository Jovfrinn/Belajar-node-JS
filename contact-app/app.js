// mengambil argumen dari comend line
const yargs = require('yargs')
const contacts = require('./contacts')
yargs.command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
            nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: "email anda",
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: "Nomor HP",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP)
    }
}).demandCommand();

// menampilkan daftar semua nama & hp contact

yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no HP contact',
    handler(){
        contacts.listContact();
    }
});


// menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan sebuah detail contact berdasarkan nama',
    builder: {
        nama:{
            describe: 'Nama Lengkap',
            demandOption: 'true',
            type: 'string'
        }
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    }
});

// menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus contact',
    builder: {
        nama:{
            describe: 'Nama Lengkap',
            demandOption: 'true',
            type: 'string'
        }
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    }
});

yargs.parse()






















// const contacs = require('./contacts');

// const main = async () => {
//     const nama = await contacs.tulisPertanyaan('Masukan nama anda :');
//     const email = await contacs.tulisPertanyaan('Masukkan email anda :');
//     const noHP = await contacs.tulisPertanyaan('Masukkan No HP anda :');
//         contacs.simpanContact(nama,email,noHP);
// };

// main();






