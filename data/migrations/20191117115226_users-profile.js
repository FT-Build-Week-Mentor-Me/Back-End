
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();

        tbl.string('username', 128).notNullable().unique()
        tbl.string('password', 255).notNullable()
        tbl.string('email', 128).notNullable().unique()
        tbl.string('profile_type', 128).notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
