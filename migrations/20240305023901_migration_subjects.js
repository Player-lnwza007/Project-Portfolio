exports.up = function (knex) {
    return knex.schema.createTable('subjects', function (table) {
        table.increments('id').unsigned().primary();
        table.string('subjects_pass', 70).notNullable().comment('รหัสวิชา');
        table.string('subjects_name', 70).notNullable().comment('ชื่อวิชา');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('subjects');
};