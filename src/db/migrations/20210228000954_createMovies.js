
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id").primary()
    table.string("title", null)
    table.integer("runtime_in_minutes", null)
    table.string("rating", null)
    table.text("description", null)
    table.string("image_url", null)
  })
};

exports.down = function(knex) {
 return knex.schema.dropTable("movies") 
};
