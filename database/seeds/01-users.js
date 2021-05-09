
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Admin', password: 'admin', department: 'admin'},
        {username: 'User1', password: 'test'},
        {username: 'User2', password: 'test'},
      ]);
    });
};
