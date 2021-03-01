
exports.up = function(knex) {
 return knex.schema.createTable("reviews", (table) => {
  table.increments("review_id").primary()
  table.text("content")
  table.integer("score")
  table.time("created_at").defaultTo(knex.fn.now())
  table.time("updated_at").defaultTo(knex.fn.now())

  table.integer("movie_id").unsigned().notNullable()
  table
    .foreign("movie_id")
    .references("movie_id")
    .inTable("movies")
    .onDelete("CASCADE")
  
  table.integer("critic_id").unsigned().notNullable()
  table
    .foreign("critic_id")
    .references("critic_id")
    .inTable("critics")
    .onDelete("CASCADE")
 }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews")
};
