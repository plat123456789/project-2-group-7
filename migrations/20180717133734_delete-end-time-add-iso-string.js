
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('dateOption', (table) => {
            table.dropColumn("end_time")
            table.string("iso_string")
        }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('dateOption', (table) => {
            table.time('end_time');
            table.dropColumn("iso_string")
        }),
    ])
};
