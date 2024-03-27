const { MongoClient } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'wpu'

const client = new MongoClient(uri, {
    useNewParser: true,
    useUnifiedTopology: true,
})

client.connect((error, client) => {
    if (error){
        return console.log('Koneksi gagal')
    }
    // Pilih database
    const db = client.db(dbName)

    // Menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: "jojo",
    //     email: "jojo@gmail.com"
    // },
    // (error, result) => {
    //     if(error){
    //         return console.log('gagal menambahkan data')
    //     }
    //     console.log(result)
    // }
    // )

    // Menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: "Jojo",
    //             email: 'jojo@yahoo.com'
    //         },
    //         {
    //             nama: "Gulo",
    //             email: 'gulo@.gmail.com'
    //         },
    //     ],
    // (error, result) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // }
    // )

    // Menampilkan semua data yang ada di collection/table
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result)
    // }));

    // Menampilkan data berdasarkan kriteria
    // console.log(db.collection('mahasiswa').find({nama: "Jojo"}).toArray((error, result) => {
    //     console.log(result)
    // }));



    // mengubah data berdasarkan  id
    // const updatePromise =  db.collection('mahasiswa').updateOne(
    //     {
    //         nama: "gulo gulo",
    //     },
    //     {
    //         $set:{
    //             email: "gulogulo@gmail.com",
    //         },
    //     }
    // )

    // updatePromise.then((result) => {console.log(result)}).catch((error) => {console.log(error)})



    // mengubah data lebih dari 1 berdasarkan kriteria
        // db.collection('mahasiswa').updateMany(
        //             {
        //                 nama: "gulo gulo",
        //             },
        //             {
        //                 $set:{
        //                     email: "gulogulo@gmail.com",
        //                 },
        //             }
        //         )

    // Menghapus 1 data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         nama: "gulo gulo"
    //     }
    // ).then((result) => {
    //     console.log(result)
    // }).cacth(error) => {
    //     console.log(error)
    // }


    // Menghapus lebih dari 1 data
    db.collection('mahasiswa').deleteMany(
        {
            nama: "gulo gulo"
        }
    ).then((result) => {
        console.log(result)
    }).cacth(error) => {
        console.log(error)
    }
})