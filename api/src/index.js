const express = require('express');
const app = express();
const port = 3000;

/* const  { createTables } = require("./helpers/dbHelpers"); */
/* const { faggot } = require("./helpers/dbHelpers"); */

async function createTables(pg) {
    pg.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('games', function (t) {
                t.increments('id').primary();
                t.string('game_name', 100);
                t.string('img_link', 100);
                t.text('desription');
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
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(process.env);

    console.log(`Example app listening at http://localhost:${port}`);

});

createTables(pg);