exports.up = function (knex) {
    return knex.schema.createTable('ranks', function (table) {
        table.increments('id').unsigned().primary();
        table.string('rankname', 50).notNullable().comment('rankname');
        table.boolean('page1').notNullable().defaultTo(false).comment('หน้า1');
        table.boolean('page2').notNullable().defaultTo(false).comment('หน้า2');
        table.boolean('page3').notNullable().defaultTo(false).comment('หน้า3');

    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('ranks');
};
