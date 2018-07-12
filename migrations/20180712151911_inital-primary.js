
exports.up = function(knex, Promise) {
    return Promise.all([
        // user
        knex.schema.createTable('user', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable(); 
            table.string('email').notNullable();
            table.string('pw').notNullable();
        }),
        // district
        knex.schema.createTable('district', (table) => {
            table.integer('id').primary();
            table.string('name');
        }),
        // event
        knex.schema.createTable('event', (table) => {
            table.increments('id').primary();
            table.string('title');
            table.string('detail');
            table.string('status');
            table.timestamps(false,true); // columns: created_at, updated_at 
        }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user'),
        knex.schema.dropTable('district'),
        knex.schema.dropTable('event')
    ])
};
