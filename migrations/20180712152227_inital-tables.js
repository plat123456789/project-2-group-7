
exports.up = function (knex, Promise) {
    return Promise.all([        
        // place
        knex.schema.createTable('place', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.integer('district_id')
            table.foreign('district_id').references('district.id');
            table.string('address');
            table.decimal('latitude');
            table.decimal('longitude');
            table.string('phone');
            table.string('category');
            table.string('image');
            table.string('link');
            table.string('price_range');
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

        // dateOption 
        knex.schema.createTable('dateOption', (table) => {
            table.increments('id').primary();
            table.integer('event_id').unsigned(); // non-negative number
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
            table.foreign('event_id').references  ('event.id');
            table.string('content');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('placeVote'),
        knex.schema.dropTable('placeOption'),
        knex.schema.dropTable('place'),
        knex.schema.dropTable('dateVote'),
        knex.schema.dropTable('dateOption'),
        knex.schema.dropTable('EvtUser'),
        knex.schema.dropTable('comment')
    ])
};
