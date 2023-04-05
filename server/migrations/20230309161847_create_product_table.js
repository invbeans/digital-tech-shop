/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("product", table => {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.integer("sub_category").notNullable().references("id").inTable("sub_category").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("manufacturer").notNullable().references("id").inTable("manufacturer").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("supplier").notNullable().references("id").inTable("supplier").onUpdate("CASCADE").onDelete("CASCADE")
        table.double("price").notNullable().checkPositive()
        table.double("rating").checkPositive()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("product")
};
