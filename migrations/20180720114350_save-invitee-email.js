
exports.up = function(knex, Promise) {
    return knex.schema.table('EvtUser',(table)=>{
      table.string('email');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('EvtUser',(table)=>{
      table.dropColumn('email');
    })
  };