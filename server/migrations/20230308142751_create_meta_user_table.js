/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("meta_user", table => {
        table.integer("user").primary().notNullable().references("id").inTable("user")
        table.integer("role").notNullable().references("id").inTable("role")
        table.string("phone_number").notNullable().unique()
        table.string("hashed_password").notNullable()
        table.date("birthday_date")
        table.string("email").notNullable().unique()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("meta_user")
};
