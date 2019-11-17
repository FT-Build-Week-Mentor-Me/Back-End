
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('threads').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('threads').insert([
        {
          thread_title: 'How did having a mentor help you start your business?',
          thread_body: "I'm strating my own business and I'm wondering if I actually need a mentor, how useful for you was it having a mentor?",
          business_type: 'construction', author_id: 1
        },
        {
          thread_title: 'How did having a mentor help you start your business?',
          thread_body: "I'm strating my own business and I'm wondering if I actually need a mentor, how useful for you was it having a mentor?",
          business_type: 'construction', author_id: 2
        },
        {
          thread_title: 'How did having a mentor help you start your business?',
          thread_body: "I'm strating my own business and I'm wondering if I actually need a mentor, how useful for you was it having a mentor?",
          business_type: 'construction', author_id: 65
        }
      ]);
    });
};
