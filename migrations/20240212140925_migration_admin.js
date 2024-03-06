exports.up = function (knex) {
    return knex.schema.createTable('admin', function (table) {
        table.increments('id').unsigned().primary();
        table.string('username', 50).notNullable().comment('ชื่อผู้ใช้');
        table.string('email', 100).notNullable().comment('email');
        table.string('password', 255).notNullable().comment('รหัสผ่าน');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('admin');
};