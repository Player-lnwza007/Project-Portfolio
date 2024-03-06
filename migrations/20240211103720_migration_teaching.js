exports.up = function (knex) {
    return knex.schema.createTable('teaching', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id', 50).notNullable().comment('ไอดีผู้ใช้');
        table.string('subjects_id', 70).notNullable().comment('ไอดีวิชา');
        table.enum('subjects_day', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).notNullable().comment('วันสอน');
        table.string('term', 10).notNullable().comment('ภาคเรียน');
        table.string('year', 10).notNullable().comment('ปีที่สอน');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('teaching');
};
