const db = require("../database/dbConfig.js");

module.exports = {
    find,
    add,
    findBy,
    findById,
    remove
};

function find() {
    return db("users").orderBy("id");
}

function findBy(filter) {
    return db("users").where(filter).orderBy('id');
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function remove(id) {
    return db('users')
      .where('id', Number(id))
      .del()
}

function findById(id) {
    return db("users").where({ id }).first();
}
