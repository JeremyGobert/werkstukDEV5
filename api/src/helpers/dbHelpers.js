

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

module.exports = createTables;


/* export async function createTables(pg) {
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
} */

/* const _faggot = faggot;
export { _faggot as faggot }; */

/* const _createTables = createTables;
export { _createTables as createTables }; */





