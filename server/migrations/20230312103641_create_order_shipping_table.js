/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_shipping", table => {
        table.integer("order").primary().notNullable().references("id").inTable("order").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("shipping_service").notNullable().references("id").inTable("shipping_service").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("adress").notNullable().references("id").inTable("adress").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("pickup_point_type").notNullable().references("id").inTable("pickup_point_type").onUpdate("CASCADE").onDelete("CASCADE")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("order_shipping")
};
