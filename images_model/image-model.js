const db = require('../database/dbConfig.js');


function find() {
    return db('images')
};

function findAllImages() {
    return db('images')
    .select('images.image_url');
};

function findById(id) {
    return db('images').where({ id }).first();
};

function add(imageData) {
    return db('images').insert(imageData);
}

function update(id, changes) {
    return db('images')
      .where({ id })
      .update(changes);
}

function remove(id) {
    return db('images')
      .where('id', Number(id))
      .del()
}

// function insertShipment(shipment) {
//     return db('shipments')
//       .insert(shipment)
//        .then(ids => ({ id: ids[0] }))
// }


module.exports = {

    find,
    findById,
    add,
    update,
    remove,
    findAllImages,
};
