/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("adress", table => {
        table.increments("id").primary()
        table.integer("region").notNullable()
        table.integer("street_type").notNullable()
        table.string("house", 20)
        table.string("building", 20)
        table.integer("apartment")
        table.integer("postcode").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("adress")
};
