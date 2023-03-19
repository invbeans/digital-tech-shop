/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, username: 'aaa', surname: 'bbbb', lastname: 'eee'},
    {id: 2, username: 'ccc', surname: 'bbbb', lastname: 'eee'},
  ]);
  await knex('role').del()
  await knex('role').insert([
    {id: 1, name: 'admin'},
    {id: 2, name: 'user'}
  ])
  await knex('meta_user').del()
  await knex('meta_user').insert([
    {user: 1, role: 1, phone_number: '234', hashed_password: 'asdaf', birthday_date: '2012-03-12', email: 'aboba'}
  ])
};
