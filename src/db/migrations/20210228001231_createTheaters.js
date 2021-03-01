exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary()
    table.string("name", null)
    table.string("address_line_1", null)
    table.string("address_line_2", null)
    table.string("city", null)
    table.string("state", null)
    table.string("zip", null)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("theaters")
};
