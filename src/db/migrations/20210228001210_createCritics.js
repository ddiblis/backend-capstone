exports.up = function(knex) {
 return knex.schema.createTable("critics", (table) => {
     table.increments("critic_id").primary()
     table.string("preferred_name", null)
     table.string("surname", null)
     table.string("organization_name")
 }) 
};

exports.down = function(knex) {
   return knex.schema.dropTable("critics")
};

// 20210228001245_createCritics