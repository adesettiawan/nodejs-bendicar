var express = require("express");
var path = require('path');
var hbs = require('hbs');
var Handlebars = require("express-handlebars");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();


app.use('/public',express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//menyambungkan database menggunakan mysql server
var mysql=require('mysql');
var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'db_rental_18753002'
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Mysql Connected!');
   }
 });  

// app.get("/product", function(req, res){
//     res.send("Hello");
// });

app.get("/", function(req, res){
    res.render("layouts/home");
});

//menampilkan data penyewa
app.get('/penyewa',(req, res) => {
  let sql = "SELECT * FROM penyewa";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('penyewa',{
      results: results
    });
  });
});

//menampilkan data petugas
app.get('/petugas',(req, res) => {
  let sql = "SELECT * FROM petugas";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('petugas',{
      results: results
    });
  });
});

//menampilkan data kendaraan
app.get('/kendaraan',(req, res) => {
  let sql = "SELECT * FROM kendaraan";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('kendaraan',{
      results: results
    });
  });
});

//menampilkan data peminjaman
app.get('/peminjaman',(req, res) => {
  let sql = "SELECT * FROM peminjaman";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('peminjaman',{
      results: results
    });
  });
});

//menampilkan data pengembalian
app.get('/pengembalian',(req, res) => {
  let sql = "SELECT * FROM pengembalian";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('pengembalian',{
      results: results
    });
  });
});

//menampilkan data denda
app.get('/denda',(req, res) => {
  let sql = "SELECT * FROM denda";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('denda',{
      results: results
    });
  });
});

//tambah data penyewa
app.post('/save',(req, res) => {
    let data = {id_penyewa: req.body.id_penyewa, nm_penyewa: req.body.nm_penyewa,jk: req.body.jk,
        alamat_penyewa: req.body.alamat_penyewa,no_hp: req.body.no_hp};
    let sql = "INSERT INTO penyewa SET ?";
    let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
          res.redirect('/penyewa');
        });
      });

//tambah data petugas
app.post('/save_petugas',(req, res) => {
  let data = {id_petugas: req.body.id_petugas, nm_petugas: req.body.nm_petugas,jk: req.body.jk,
      jabatan: req.body.jabatan,gaji: req.body.gaji};
  let sql = "INSERT INTO petugas SET ?";
  let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
        res.redirect('/petugas');
      });
    });

//tambah data kendaraan
app.post('/save_kendaraan',(req, res) => {
  let data = {no_pol: req.body.no_pol, jenis: req.body.jenis,merek: req.body.merek,
      harga_sewa: req.body.harga_sewa};
  let sql = "INSERT INTO kendaraan SET ?";
  let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
        res.redirect('/kendaraan');
      });
    });

//tambah data peminjaman
app.post('/save_peminjaman',(req, res) => {
  let data = {no_transaksi: req.body.no_transaksi, tgl_peminjaman: req.body.tgl_peminjaman,id_petugas: req.body.id_petugas,
      id_penyewa: req.body.id_penyewa,no_pol: req.body.no_pol,jk: req.body.jk,lama_peminjaman: req.body.lama_peminjaman,harga: req.body.harga};
  let sql = "INSERT INTO peminjaman SET ?";
  let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
        res.redirect('/peminjaman');
      });
    });

//tambah data pengembalian
app.post('/save_pengembalian',(req, res) => {
  let data = {no_transaksi: req.body.no_transaksi, tgl_kembali: req.body.tgl_kembali,id_petugas: req.body.id_petugas,
      id_penyewa: req.body.id_penyewa,no_pol: req.body.no_pol,id_denda: req.body.id_denda,harga: req.body.harga};
  let sql = "INSERT INTO pengembalian SET ?";
  let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
        res.redirect('/pengembalian');
      });
    });

//tambah data denda
app.post('/save_denda',(req, res) => {
  let data = {id_denda: req.body.id_denda, nama_denda: req.body.nama_denda,harga_denda: req.body.harga_denda,
      ket: req.body.ket};
  let sql = "INSERT INTO denda SET ?";
  let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
        res.redirect('/denda');
      });
    });


//edit data penyewa
app.post('/update',(req, res) => {
    let sql = "UPDATE penyewa SET nm_penyewa='"+req.body.nm_penyewa+"', jk='"+req.body.jk+"', alamat_penyewa='"+req.body.alamat_penyewa+"', no_hp='"+req.body.no_hp+"' WHERE id_penyewa="+req.body.id_penyewa;
    let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/penyewa');
   });
 });

 //edit data petugas
app.post('/update_petugas',(req, res) => {
  let sql = "UPDATE petugas SET nm_petugas='"+req.body.nm_petugas+"', jk='"+req.body.jk+"', jabatan='"+req.body.jabatan+"', gaji='"+req.body.gaji+"' WHERE id_petugas="+req.body.id_petugas;
  let query = connection.query(sql, (err, results) => {
  if(err) throw err;
  res.redirect('/petugas');
 });
});

 //edit data kendaraan
 app.post('/update_kendaraan',(req, res) => {
  let sql = "UPDATE kendaraan SET jenis='"+req.body.jenis+"', merek='"+req.body.merek+"', harga_sewa='"+req.body.harga_sewa+"' WHERE no_pol="+req.body.no_pol;
  let query = connection.query(sql, (err, results) => {
  if(err) throw err;
  res.redirect('/kendaraan');
 });
});

 //edit data peminjaman
 app.post('/update_peminjaman',(req, res) => {
  let sql = "UPDATE peminjaman SET tgl_peminjaman='"+req.body.tgl_peminjaman+"', id_petugas='"+req.body.id_petugas+"', id_penyewa='"+req.body.id_penyewa+"', no_pol='"+req.body.no_pol+"', jk='"+req.body.jk+"', lama_peminjaman='"+req.body.lama_peminjaman+"', harga='"+req.body.harga+"' WHERE no_transaksi="+req.body.no_transaksi;
  let query = connection.query(sql, (err, results) => {
  if(err) throw err;
  res.redirect('/peminjaman');
 });
});

//edit data pengembalian
app.post('/update_pengembalian',(req, res) => {
  let sql = "UPDATE pengembalian SET tgl_kembali='"+req.body.tgl_kembali+"', id_petugas='"+req.body.id_petugas+"', id_penyewa='"+req.body.id_penyewa+"', no_pol='"+req.body.no_pol+"', id_denda='"+req.body.id_denda+"', harga='"+req.body.harga+"' WHERE no_transaksi="+req.body.no_transaksi;
  let query = connection.query(sql, (err, results) => {
  if(err) throw err;
  res.redirect('/pengembalian');
 });
});

 //edit data denda
 app.post('/update_denda',(req, res) => {
  let sql = "UPDATE denda SET nama_denda='"+req.body.nama_denda+"', harga_denda='"+req.body.harga_denda+"', ket='"+req.body.ket+"' WHERE id_denda="+req.body.id_denda;
  let query = connection.query(sql, (err, results) => {
  if(err) throw err;
  res.redirect('/denda');
 });
});

//hapus data penyewa
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM penyewa WHERE id_penyewa="+req.body.id_penyewa+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/penyewa');
  });
});

//hapus data petugas
app.post('/delete_petugas',(req, res) => {
  let sql = "DELETE FROM petugas WHERE id_petugas="+req.body.id_petugas+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/petugas');
  });
});

//hapus data kendaraan
app.post('/delete_kendaraan',(req, res) => {
  let sql = "DELETE FROM kendaraan WHERE no_pol="+req.body.no_pol+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/kendaraan');
  });
});

//hapus data peminjaman
app.post('/delete_peminjaman',(req, res) => {
  let sql = "DELETE FROM peminjaman WHERE no_transaksi="+req.body.no_transaksi+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/peminjaman');
  });
});

//hapus data peminjaman
app.post('/delete_pengembalian',(req, res) => {
  let sql = "DELETE FROM pengembalian WHERE no_transaksi="+req.body.no_transaksi+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/pengembalian');
  });
});

//hapus data denda
app.post('/delete_denda',(req, res) => {
  let sql = "DELETE FROM denda WHERE id_denda="+req.body.id_denda+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/denda');
  });
});

app.listen(3000, function(){
    console.log("connected");
});