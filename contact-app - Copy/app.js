// mengambil argumen dari comend line
// const yargs = require('yargs')



// console.log(yargs.argv)




























const contacs = require('./contacts');

const main = async () => {
    const nama = await contacs.tulisPertanyaan('Masukan nama anda :');
    const email = await contacs.tulisPertanyaan('Masukkan email anda :');
    const noHP = await contacs.tulisPertanyaan('Masukkan No HP anda :');
        contacs.simpanContact(nama,email,noHP);
};

main();






