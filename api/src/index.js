const express = require('express');
const app = express();
const port = 3000;

/* const  { createTables } = require("./helpers/dbHelpers"); */
/* const { faggot } = require("./helpers/dbHelpers"); */

async function createTables(pg) {
    pg.schema.hasTable('games').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('games', function (t) {
                t.increments('id').primary();
                t.string('game_name', 100);
                t.string('img_link', 100);
                t.text('desk');
            });
        } else {
            console.log("table fucking exists");
        }
    });
}


const pg = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
    }
});

app.get('/', (req, res) => {
        res.send("hellooooooo");
});


app.get('/gatAll', (req, res) => {
    pg('games').insert({game_name: 'Slaughterhouse Five', img_link: 'no shit', desk: 'iets fucking klote'});
    pg.select("*").table("games").then((data) => {
        res.send(data);
    });
});

app.get('/deleteID/:gameId', (req, res) => {
    const searchID = Object.values(req.params).toString();
    pg('games').where({ id: searchID }).del();
});

app.get('/deleteID/:gameId', (req, res) => {
    const deleteID = Object.values(req.params).toString();
    pg('games').where({ id: deleteID }).del();
});

app.get('/updateID/:gameId', (req, res) => {
    let updateID = req.query.id;
    let name = req.query.newName;
    pg('games').where({ id: updateID }).update({ game_name: name });
});





app.listen(port, () => {


    console.log(`Example app listening at http://localhost:${port}`);

});

createTables(pg);