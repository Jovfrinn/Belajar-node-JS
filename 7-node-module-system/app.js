// Core Module
// File System
// const { Console } = require('node:console');
const fs = require('node:fs');
// console.log(fs)

// Menuliskan string ke file (Syncronous)

// try{
    // fs.writeFileSync('data/test.txt', 'Hello World secara syncronous!');
    // } catch(e){
        //     console.log(e);
        // }
        // fs.writeFileSync('filenya', 'Datanya');
        


// Menuliskan string ke file (Asyncronous)
// fs.writeFile('data/test.txt', 'Hello World secara Asyncrounus', (err) => {
//     console.log(err)
// });






//  membaca isi file (Syncrounous)
// const data = fs.readFileSync('data/test.txt','utf-8');
// console.log(data)



//  membaca isi file (Syncrounous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     // console.log(e);
//     if (err) throw err;
//     console.log(data);
// });



// console.log(data)
// const [angka, setangka] = useState('');


const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

rl.question('Siapakah Nama anda? ' ,(nama) => {
    rl.question('Masukkan Nomor anda.. ', (nomor) => {
    // console.log(`Terimakasih ${nama}`);
    // rl.close();
    const contact = { nama, nomor };
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))

        console.log(`Terimakasih sudah mengisi data`);
        rl.close();
    })
});












