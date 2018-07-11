
exports.up = function (knex, Promise) {
    return Promise.all([
        // user
        knex.schema.createTable('user', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable(); 
            table.string('email').notNullable();
            table.string('pw').notNullable();
        }),
        // district id
        knex.schema.createTable('district', (table) => {
            table.increments('id').primary();
            table.string('name');
        }),
        // place
        knex.schema.createTable('place', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.integer('district_id').unsigned(); // non-negative number
            table.foreign('district_id').references('district.id');
            table.string('address');
            table.string('phone');
            table.string('category');
            table.string('image');
            table.string('link');
            table.string('price_range');
        }),
        // event
        knex.schema.createTable('event', (table) => {
            table.increments('id').primary();
            table.string('title');
            table.string('detail');
            table.integer('dateOption_id').unsigned();
            table.foreign('dateOption_id').references('dateOption.id');
            table.integer('placeOption_id').unsigned();
            table.foreign('placeOption_id').references('placeOption.id');
            table.string('status');
        }),
        // dateOption
        knex.schema.createTable('dateOption', (table) => {
            table.increments('id').primary();
            table.integer('event_id').unsigned();
            table.foreign('event_id').references('event.id');
            table.date('date');
            table.time('start_time');
            table.time('end_time');
        }),
        // dateVote
        knex.schema.createTable('dateVote', (table) => {
            table.increments('id').primary();
            table.integer('dateOption_id').unsigned();
            table.foreign('dateOption_id').references('dateOption.id');
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
        }),
        // placeOption
        knex.schema.createTable('placeOption', (table) => {
            table.increments('id').primary();
            table.integer('event_id').unsigned();
            table.foreign('event_id').references('event.id');
            table.integer('place_id').unsigned();
            table.foreign('place_id').references('place.id');
        }),
        // placeVote
        knex.schema.createTable('placeVote', (table) => {
            table.increments('id').primary();
            table.integer('placeOption_id').unsigned();
            table.foreign('placeOption_id').references('placeOption.id');
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
        }),
        // EvtUser
        knex.schema.createTable('EvtUser', (table) => {
            table.increments('id').primary();
            table.integer('event_id').unsigned();
            table.foreign('event_id').references('event.id');
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.boolean('isCreator');
        }),
        // comment
        knex.schema.createTable('comment', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.integer('event_id').unsigned();
            table.foreign('event_id').references('event.id');
            table.string('content');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user'),
        knex.schema.dropTable('district'),
        knex.schema.dropTable('place'),
        knex.schema.dropTable('event'),
        knex.schema.dropTable('dateOption'),
        knex.schema.dropTable('dateVote'),
        knex.schema.dropTable('placeOption'),
        knex.schema.dropTable('placeVote'),
        knex.schema.dropTable('EvtUser'),
        knex.schema.dropTable('comment')
    ])
};
