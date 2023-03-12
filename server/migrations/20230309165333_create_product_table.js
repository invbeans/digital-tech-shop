/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("product", table => {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.integer("sub_category").notNullable()
        table.integer("manufacturer").notNullable()
        table.integer("supplier").notNullable()
        table.double("price").notNullable().checkPositive()
        table.double("rating").notNullable().checkPositive()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("product")
};
