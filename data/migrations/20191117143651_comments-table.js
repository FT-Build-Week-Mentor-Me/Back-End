
exports.up = function (knex) {
    return knex.schema.createTable('comments', tbl => {
        tbl.increments()

        tbl.string('comment-text', 8000).notNullable()
        tbl.integer('thread-id', 64)
            .unsigned()
            .references('id')
            .inTable('threads')
            .notNullable()
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
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
    return knex.schema.dropTableIfExists('comments')
};
