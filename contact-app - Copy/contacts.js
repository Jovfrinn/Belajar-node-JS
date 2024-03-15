const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

// membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file contacs.json Jika blum ada
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}



const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan ,jawaban => resolve(jawaban) );
    });
};



const simpanContact = (nama,email,noHP) => {
    const contact = { nama, email,noHP };
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))

        console.log(`Terimakasih sudah mengisi data`);
        rl.close();
}



module.exports = {
    tulisPertanyaan,simpanContact
}




