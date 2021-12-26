const express = require('express');
const app = express();
const port = 3000;
const  helper = require("./helpers/dbHelpers.js");

//connection with database server
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

//get all usable routs 
app.get('/', (req, res) => {
    let routes = [];
    app._router.stack.forEach(element => {
        if (element.name === "bound dispatch") {
            routes.push(element.route.path);
        }
    });
    res.send(routes);
});

//get all games 
app.get('/getAllGames', (req, res) => {
    pg('games').table("games").join("categories","games.categories_id","=","categories.id").then((data) => {
        res.send(data);
    });
});

//get all categories
app.get('/getAllCategories', (req, res) => {
    pg.select('*').from('categories').then((data) => {
        res.send(data);
    });
});

//instert a new game 
app.get('/insertGame/:name-:img-:catid', (req, res) => {
    let name = req.params.name;
    let link = req.params.img;
    let catid = req.params.catid;
    pg('games').insert({
            game_name: name,
            img_link: link,
            categories_id: catid
        })
        .then(function (result) {
            res.json({
                success: true,
                message: 'ok'
            });
        });
});

//insert a new categorie
app.get('/insertCategorie/:cat', (req, res) => {
    let cat = req.params.cat;
    let catCheck = parseInt(req.params.cat);
    if(!Number.isInteger(catCheck)){
        pg('categories').insert({
            categorie: cat
        })
        .then(function (result) {
            res.json({
                success: true,
                message: 'ok',
                input: cat
            });
        });
    }else{
        res.json({
            success: false,
            message: 'no numbers',
            wrongInput: cat
        });
    }
});

//delete on game ID
app.get('/deleteOnID/:gameId', (req, res) => {
    let Id = req.params.gameId;
    pg('games').where('id', Id).del().then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});

//update on game ID
app.get('/updateNameOnID/:gameId-:newName', (req, res) => {
    let updateID = parseInt(req.params.gameId);
    let name = req.params.newName;
    if(Number.isInteger(updateID)){
        pg('games').where({
            id: updateID
        }).update({
            game_name: name
        }).then(function (result) {
            res.json({
                success: true,
                message: 'ok',
                inputID: updateID,
                inputName: name
            });
        });
    } else{
        res.json({
            success: false,
            message: 'no id given',
            input: req.params.gameId
        });
    }
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//creating the tables 
helper.createTables(pg);