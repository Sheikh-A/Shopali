
exports.up = function(knex) {
    return (
        knex.schema
          .createTable('images', tbl => {
              tbl.increments(); //IMAGE ID
              tbl.string('image_url',255).notNullable().unique();
              tbl.string('description',255).notNullable();
              tbl.decimal("price")
                .notNullable()
                .unsigned();
              tbl.timestamps(true,true);
          })
    )};

  exports.down = function(knex) {
      return knex.schema
        .dropTableIfExists('images');
  };
