const { log } = require('node:console');
const fs = require('node:fs');

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

// ambil semua data di contact.json
const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
}
// cari contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase()); 
    return contact;
}

// Menuliskan  / Menimpa file contact.js dengan data yang baru
const saveContacts = (contact) => {
    fs.writeFileSync('data/contact.json',JSON.stringify(contact));
}
// menambahkan data contact yang baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}


// cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama)
}

// Hapus Contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
    console.log(filteredContacts);
    saveContacts(filteredContacts)
}

// untuk mengubah contacts
const updateContacts = (contactBaru) => {
    const contacts = loadContact()
    // hilangkan contact lama yang namanya sama dengan old nama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
    delete contactBaru.oldNama;
    filteredContacts.push(contactBaru)
    saveContacts(filteredContacts);
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}











