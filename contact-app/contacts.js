const fs = require('node:fs');
const chalk = require('chalk');
const validator = require('validator')

// membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json Jika blum ada
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}


const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
}


const simpanContact = (nama,email,noHP) => {
    const contact = { nama, email,noHP };
    // const file = fs.readFileSync('data/contact.json', 'utf8');
    // const contacts = JSON.parse(file);
    const contacts = loadContact();

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat){
        console.log(chalk.red.inverse.bold('contact sudah terdaftar gunakan nama lain'))
        return false;
    }


    // cek email
    if (email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid'))
            return false;
        }
    }


    // cek nomor hp
    if(!validator.isMobilePhone(noHP,"id-ID")){
        console.log(chalk.red.inverse.bold('Nomor HP Tidak Valid!'))
        return false;
    }


    contacts.push(contact);
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))

        console.log(chalk.green.inverse.bold`Terimakasih sudah mengisi data`);
}

const listContact = () => {
 const contacts = loadContact()
 console.log(chalk.cyan.inverse.bold`Daftar Kontak :`);
 contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`)
 })
}

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase()); 
    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }
 console.log(chalk.cyan.inverse.bold`${contact.nama}`);
console.log(contact.noHP);
if(contact.email){
    console.log(contact.email);
};
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }
    fs.writeFileSync('data/contact.json', JSON.stringify(newContacts))

    console.log(chalk.green.inverse.bold`data contact ${nama} berhasil di hapus`);


}

module.exports = {
    simpanContact, listContact, detailContact,deleteContact
}




