
//creating the needed tables 
async function createTables(pg) {
    pg.schema.hasTable('games').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('games', function (t) {
                t.increments('id').primary();
                t.string('game_name', 100);
                t.string('img_link', 100);
                t.integer('categories_id');
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
            });
        } else {
            console.log("table categories exists!");
        }
    });
}

//exporting the function 
module.exports = { createTables };






