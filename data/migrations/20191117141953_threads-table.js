
exports.up = function (knex) {
    return knex.schema.createTable('threads', tbl => {
        tbl.increments();

        tbl.string('thread_title', 255)
            .notNullable()
        tbl.string('thread_body', 10000)
            .notNullable()
        tbl.string('business_type', 255)
            .notNullable()
        tbl.string('extra_data')
        tbl.integer('author_id', 64)
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable()
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('threads')
};
