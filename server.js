// requiring express module 
const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path'); 

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


app.get('/api/notes', (req, res) => {
fs.readFile('db/db.json', 'utf8', (error, data) => {
    if (error) {
        throw error
    }
    let notes = JSON.parse(data)
    res.json(notes.notes)
})
})

app.post('/api/notes', (req, res) => {

    const {title, text} = req.body;
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        if (error) {
            throw error
        }
        let notes = JSON.parse(data)
        let note = {title,text,id: Date.now()}
        notes.notes.push(note)

        fs.writeFile('db/db.json',JSON.stringify(notes),(err)=>{
            if (err) {
                throw err
            }
            res.json(note)
        })
    })
    })

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public'))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log('server started')
})


