exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('place', (table) => {
            table.string("cuisine");
        }),
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('place', (table) => {
            table.dropColumn("cuisine");
        })
    ])
};