exports.up = function (knex) {
    return knex.schema.createTable('subjects', function (table) {
        table.increments('id').unsigned().primary();
        table.string('subjects_name', 70).notNullable().comment('ชื่อวิชา');
        table.string('subjects_group', 6).notNullable().comment('กลุ่มเรียน');
        table.time('subjects_starttime').notNullable().comment('เวลาเริ่ม');
        table.time('subjects_endtime').notNullable().comment('เวลาจบ');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('subjects');
};