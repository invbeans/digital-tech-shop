/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  /*await knex('user').del()
  await knex('user').insert([
    {username: 'aaa', surname: 'bbbb', lastname: 'eee'},
    {username: 'ccc', surname: 'bbbb', lastname: 'eee'},
  ]);*/
  await knex('role').del()
  await knex('role').insert([
    {name: 'ADMIN'},
    {name: 'MANAGER'},
    {name: "CONTENT"},
    {name: 'USER'}
  ])

  await knex('pickup_point_type').del()
  await knex('pickup_point_type').insert([
    {name: "Пункт выдачи", storage_days: 5},
    {name: "Постамат", storage_days: 2},
    {name: "Почтовое отделение", storage_days: 15},
    {name: "На дом", storage_days: 0}
  ])

  await knex('shipping_method').del()
  await knex('shipping_method').insert([
    {name: "Курьерская служба", shipping_time: "В течение 2-4 часов"},
    {name: "Самовывоз", shipping_time: "В течение 2-ух недель"},
    {name: "Почтовое отправление", shipping_time: "В течение 3-ёх недель"}
  ])

  await knex('shipping_status').del()
  await knex('shipping_status').insert([
    {name: "Ожидает оплаты"},
    {name: "Оплачен"},
    {name: "В работе"},
    {name: "Выполнен"},
    {name: "Отменён"},
    {name: "На проверке"},
    {name: "Возвращён"},
  ])

  await knex('payment_method').del()
  await knex('payment_method').insert([
    {name: "Наличными при получении"},
    {name: "Банковской картой при получении"},
    {name: "Банковской картой онлайн"},
    {name: "Система быстрых платежей"}
  ])

  await knex('action_type').del()
  await knex('action_type').insert([
    {name: "SubCategory"},
    {name: "Holiday"},
    {name: "Brand"},
    {name: "Double"}
  ])
  /*await knex('meta_user').del()
  await knex('meta_user').insert([
    {user: 1, role: 1, phone_number: '234', hashed_password: 'asdaf', birthday_date: '2012-03-12', email: 'aboba'}
  ])*/
};
