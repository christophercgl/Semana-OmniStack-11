exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        // PK
        table.increments();

        // Campos
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        // FK
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
