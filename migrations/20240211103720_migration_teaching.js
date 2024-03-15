exports.up = function (knex) {
    return knex.schema.createTable('teaching', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id', 50).notNullable().comment('ไอดีผู้ใช้');
        table.integer('subjects_id', 70).notNullable().comment('ไอดีวิชา');
        table.enum('subjects_day', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).notNullable().comment('วันสอน');
        table.string('subjects_group', 6).notNullable().comment('กลุ่มเรียน');
        table.time('subjects_starttime').notNullable().comment('เวลาเริ่ม');
        table.time('subjects_endtime').notNullable().comment('เวลาจบ');
        table.string('term', 10).notNullable().comment('ภาคเรียน');
        table.string('year', 10).notNullable().comment('ปีที่สอน');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('teaching');
};
