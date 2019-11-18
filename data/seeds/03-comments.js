
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          comment_text: "If the shipping cost of having the product sent to you, maybe you could reach out to the factory to see if they offer dropshipping services to help cut costs, but that does mean that you won't be able to QA check your products before it reaches the customer. Another option you could do would be finding a printer that gives the same quality of print and possibly trying to package it yourself, this comes with a whole other mess of possible problems itself, though.",
          thread_id: 2, author_id: 2
        },
        {
          comment_text: 'Having a mentor was incredibly valuable for me, they helped me notice mistakes I was making early so that I could aboid then.',
          thread_id: 1, author_id: 1
        },
        {
          comment_text: "There are a few ways for you to get clients, there are always parents looking for tutors so finding the right places to put your name out there for people to reach out to and give a shot is huge, but with out more clients there's likely going to be less trust. You could also ask your current client if they know anyone who is looking for a tutor and give them some business cards to give out when other parents talk about needing a tutor.",
          thread_id: 3, author_id: 3
        }
      ]);
    });
};
