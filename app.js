const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const BodyParser = require('body-parser')
const JsonParser = BodyParser.json()
const cors = require('cors')

const app = express()
const port = 3000

app.listen(port, () => console.log(`Borderlands API listening on ${port}`))
app.use(cors())

const mongoUrl = 'mongodb://localhost:27017/'
const dbName = 'borderlands'

var getDataFromDb = (db, callback) => {
    var collection = db.collection('player-builds')
    collection.find({title: {$exists: true}}).toArray(function (err, docs) {
        console.log("Found the following records:")
        callback(docs)
    })
}

app.get('/builds', (req, res) => {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        console.log('Connected to database')

        let db = client.db(dbName)
        getDataFromDb(db, (result) => {
            console.log(result)
            res.json(result)
        })
    })
})

