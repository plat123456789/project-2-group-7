
exports.up = function(knex, Promise) {
    return knex.schema.table('place', (table) => {
        table.decimal('latitude');
        table.decimal('longitude');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('place', (table) => {
        table.dropColumn('latitude');
        table.dropColumn('longitude');
    });
};
