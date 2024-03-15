exports.up = function (knex) {
    return knex.schema.createTable('culture', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id', 50).notNullable().comment('ไอดีผู้ใช้');
        table.integer('activity_id', 50).notNullable().comment('ไอดีผู้ใช้');
        table.text('activity_file').notNullable().comment('เนื้อหาของไฟล์');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('culture');
};