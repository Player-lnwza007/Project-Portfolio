exports.up = function (knex) {
    return knex.schema.createTable('H_culture', function (table) {
        table.increments('id').unsigned().primary();
        table.enum('activity_type', ['culture', 'service']).notNullable().comment('ประเภทกิจกรรม');
        table.string('activity_name', 70).notNullable().comment('ชื่อกิจกรรม');
        table.datetime('activity_start').notNullable().comment('เวลาเริ่ม');
        table.datetime('activity_end').notNullable().comment('เวลาจบ');
        table.string('year', 10).notNullable().comment('ปีที่จัด');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('H_culture');
};