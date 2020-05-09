exports.up = function (knex, Promise) {
  return knex.schema.createTable("bank_service", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name").notNull();
    table.decimal("cost").notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("bank_service");
};
