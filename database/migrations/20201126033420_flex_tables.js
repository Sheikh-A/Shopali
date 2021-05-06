
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('clients', tbl => {
            tbl.increments();
            tbl.string('client_name',255).notNullable().unique();
            tbl.string('client_segment',255).notNullable();
            tbl.timestamps(true,true);

        })
        .createTable('shipments', tbl => {
            tbl.increments();
            tbl.text('shipment_name',255)
            tbl.integer('client_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('clients')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
            tbl.timestamps(true,true);
        })
  )};

exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('shipments')
      .dropTableIfExists('clients');
};
