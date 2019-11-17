
exports.up = function (knex) {
    return knex.schema.createTable('responses', tbl => {
        tbl.increments()
        tbl.string('response_text', 8000).notNullable()
        tbl.integer('comment_id', 64)
            .unsigned()
            .references('id')
            .inTable('comments')
            .notNullable()
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
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
    return knex.schema.dropTableIfExists('responses')
};
