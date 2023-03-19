/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("check", table => {
        table.integer("order").primary().notNullable().references("id").inTable("order")
        table.integer("payment_method").notNullable().references("id").inTable("payment_method")
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
