
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('responses').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('responses').insert([
        { response_text: "Thank you! I'm really interested in trying out printing the product at home but the upfront cost is insane, i'm going to see if I can do drop shipping until I can afford printing at home if it still makes sense.", comment_id: 1, author_id: 6 },
        { response_text: "I've definitely already told the parents to let me know if they have any friends that need tutors as well, I don't have business cards yet that's a great idea! As for putting my name out there I'm really worried about doing that before I've had a little more experience, so I'll start looking at good places and keep an eye on the other people who are listing their tutoring services.", comment_id: 3, author_id: 3 },
        { response_text: "Awesome thank you! That's really good to know!", comment_id: 2, author_id: 7 }
      ]);
    });
};
