/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("shipping_history", table => {
        table.increments("id").primary()
        table.integer("order").notNullable().references("id").inTable("order")
        table.dateTime("date").notNullable()
        table.integer("shipping_status").notNullable().references("id").inTable("shipping_status")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("shipping_history")
};
