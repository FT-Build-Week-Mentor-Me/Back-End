
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          comment_text: 'Having a mentor was incredibly valuable for me, they helped me notice mistakes I was making early so that I could aboid then.',
          thread_id: 2, author_id: 2
        },
        {
          comment_text: 'Having a mentor was incredibly valuable for me, they helped me notice mistakes I was making early so that I could aboid then.',
          thread_id: 1, author_id: 1
        },
        {
          comment_text: 'Having a mentor was incredibly valuable for me, they helped me notice mistakes I was making early so that I could aboid then.',
          thread_id: 3, author_id: 3
        }
      ]);
    });
};
