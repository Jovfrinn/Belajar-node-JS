
// console.log("Hello World")
// bisa ngirim function

const cetakNama = nama => console.log(`Hai nama saya ${nama}`);

// bisa ngirim variabel
const PI = 3.14;

// bisa ngirim object
const mahasiswa = {
    nama : 'Jovfrin Joiner',
    umur : 20,
    cetakMhs(){
        return `Halo nama saya ${this.nama}, umur saya ${this.umur}`
    }
} 

class Orang{
    constructor(){
        console.log("Objek orang telah di buat")
    }
}

// mengekspor
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;
 

// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang
// }

module.exports = {cetakNama, PI, mahasiswa, Orang}

























