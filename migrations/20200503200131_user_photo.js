exports.up = function (knex) {
  return knex.schema.createTable("user_photo", (table) => {
    table.increments("id").unsigned().primary();
    table.string("url").notNull();
    table.integer("user_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
