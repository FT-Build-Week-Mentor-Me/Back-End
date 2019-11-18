
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('threads').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('threads').insert([
        {
          thread_title: 'How did having a mentor help you start your business?',
          thread_body: "I'm strating my own business and I'm wondering if I actually need a mentor, how useful for you was it having a mentor?",
          business_type: 'construction', author_id: 7
        },
        {
          thread_title: "I'm looking to improve my delivery chain what are some good solutions?",
          thread_body: "I've recently released a trading card game that does mostly online orders with some local stores carrying my product. All of the printing and packaging is done at an offsite location and shipped to me, is there something you would recommend I should do to cut shipping costs as my business grows?",
          business_type: "Trading Card Game", author_id: 6
        },
        {
          thread_title: "I'm starting a tutoring business, How should I get my name out there and get my first clients?",
          thread_body: "I currently tutor a couple of siblings and I really enjoy the work so I'm looking to start my own tutoring company, what would the best way for me to get started on building a bigger network of clients in the very begging? My current students are a friends kids.",
          business_type: 'Teaching', author_id: 5
        }
      ]);
    });
};
