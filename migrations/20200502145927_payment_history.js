exports.up = function (knex, Promise) {
  return knex.schema.createTable("payment_history", (table) => {
    table.increments("id").unsigned().primary();
    table.string("info").notNull();
    table.integer("by_whom").references("id").inTable("users");
    table.decimal("cost").notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("payment_history");
};
