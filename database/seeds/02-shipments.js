exports.seed = function(knex, Promise) {
  return knex('shipments').insert([
    {shipment_name: 'Blue Tech', client_id: 1},
    {shipment_name: 'Green Tech', client_id: 2},
    {shipment_name: 'Yellow Tech', client_id: 3},
    {shipment_name: 'Purple Tech', client_id: 4},
    {shipment_name: 'Client One', client_id: 5},
    {shipment_name: 'Client Two', client_id: 6},
    {shipment_name: 'Client Three', client_id: 7},
    {shipment_name: 'Client Four', client_id: 8},
    {shipment_name: 'Client Five', client_id: 9},
    {shipment_name: 'Client Ten', client_id: 10},
  ]);
};
