const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const db = require("./connection")
const response = require("./response")

app.use(bodyParser.json())

app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "SUCCESS", res)
})

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa"
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "mahasiswa get list", res)
  })
})

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "get detail mahasiswa", res)
  })
})

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res)
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId
      }
      response(200, data, "Data Added Successfully", res)
    }
  })
})

app.put("/mahasiswa", (req, res) => {
  response(200, "INI PUT ATAU UPDATE DATA", res)
})

app.delete("/mahasiswa", (req, res) => {
  response(200, "INI DELETE DATA", res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})