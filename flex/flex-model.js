const db = require('../database/dbConfig.js');


function find() {
    return db('clients')
};

function findAllShipments() {
    return db('shipments')
    .join('clients', 'clients.id', 'client_id')
    .select('shipments.*', 'client_name as client_name')
};

function findById(id) {
    return db('clients').where({ id }).first();
};

function findClientShipments(client_id) {
    return db('shipments')
      .join('clients', 'clients.id', 'client_id')
      .select('shipments.*', 'client_name as client_name')
      .where('client_id', client_id);
}

function findShipmentById(id) {
    return db('shipments')
      .join('clients', 'clients.id', 'client_id')
      .select('shipments.*', 'id as post')
      .where('shipments.id', id)
}

function add(clientData) {
    return db('clients').insert(clientData);
}

function update(id, changes) {
    return db('clients')
      .where({ id })
      .update(changes);
}

function remove(id) {
    return db('clients')
      .where('id', Number(id))
      .del()
}

// function insertShipment(shipment) {
//     return db('shipments')
//       .insert(shipment)
//        .then(ids => ({ id: ids[0] }))
// }

function insertShipment(shipment) {
    return db('shipments')
      .insert(shipment)
}

module.exports = {

    find,
    findById,
    add,
    update,
    remove,
    insertShipment,
    findAllShipments,
    findShipmentById,
    findClientShipments

};
