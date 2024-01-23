exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').unsigned().primary();
        table.string('username', 50).notNullable().comment('username');
        table.string('email', 100).notNullable().comment('email');
        table.string('password', 255).notNullable().comment('password');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
