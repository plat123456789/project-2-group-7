
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('event', (table) => {
            table.string('title').notNullable().alter();           
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('event', (table) => {
            table.string('title').nullable().alter();
        })
    ])
};

