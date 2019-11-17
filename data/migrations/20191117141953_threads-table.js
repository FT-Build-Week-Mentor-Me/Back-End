
exports.up = function (knex) {
    return knex.schame.createTable('threads', tbl => {
        tbl.increments();

        tbl.string('thread-title', 255)
            .notNullable()
        tbl.string('question', 10000)
            .notNullable()
        tbl.string('business-type', 255)
            .notNullable()
        tbl.string('extra-data')
        tbl.integer('author-id', 64)
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
