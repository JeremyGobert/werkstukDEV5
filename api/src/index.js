const express = require('express');
const app = express();
const port = 3000;

/* const  { createTables } = require("./helpers/dbHelpers.js");
 */
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
            console.log("table games exists!");
        }
    });
    pg.schema.hasTable('categories').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('categories', function (t) {
                t.increments('id').primary();
                t.string('categorie', 100);
            }).then(function (result) {
                pg('games').join('contacts', 'users.id', '=', 'contacts.id').join('contacts', {'users.id': 'contacts.id'})
                
            });
        } else {
            console.log("table categories exists!");
        }
    });
}

/* https://api.boardgameatlas.com/api/game/categories?pretty=true&client_id=SlpYx6GX5u */

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
    let routes = [];
    app._router.stack.forEach(element => {
        if (element.name === "bound dispatch") {
            routes.push(element.route.path);
        }
    });
    res.send(routes);
});


app.get('/getAll', (req, res) => {
    pg.select("*").table("games").then((data) => {
        res.send(data);
    });
});


app.get('/insert/:name-:img-:desc', (req, res) => {
    let name = req.params.name;
    let link = req.params.img;
    let desc = req.params.desc;
    pg('games').insert({
            game_name: name,
            img_link: link,
            desription: desc
        })
        .then(function (result) {
            res.json({
                success: true,
                message: 'ok'
            });
        });
});


app.get('/deleteID/:gameId', (req, res) => {
    let Id = req.params.gameId;
    pg('games').where('id', Id).del().then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});


app.get('/updateName/:gameId-:newName', (req, res) => {
    let updateID = req.params.gameId;
    let name = req.params.newName;
    pg('games').where({
        id: updateID
    }).update({
        game_name: name
    }).then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

createTables(pg);