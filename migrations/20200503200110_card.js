exports.up = function (knex) {
  return knex.schema.createTable("card", (table) => {
    table.increments("id").unsigned().primary();
    table.bigInteger("card_number").notNull();
    table.integer("card_cvv").notNull();
    table.string("card_owner").notNull();
    table.decimal("card_cash").notNull();
    table.integer("user_owner_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("card");
};
