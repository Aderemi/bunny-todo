
exports.up = function(knex, Promise) {
    return knex.schema.createTable('todo', (table) => {
        table.increments();
        table.integer('user_id').notNullable();
        table.text('description').notNullable();
        table.string('status').defaultTo("to do").notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todo');
};