
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { response_text: "Awesome thank you! That's really good to know!", comment_id: 1, author_id: 4 },
        { response_text: "Awesome thank you! That's really good to know!", comment_id: 3, author_id: 5 },
        { response_text: "Awesome thank you! That's really good to know!", comment_id: 2, author_id: 6 }
      ]);
    });
};
