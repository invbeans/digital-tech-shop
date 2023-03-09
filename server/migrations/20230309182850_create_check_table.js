/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("check", table => {
        table.integer("order").primary().notNullable()
        table.integer("payment_method").notNullable()
        table.double("full_price").notNullable().checkPositive()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("check")
};
