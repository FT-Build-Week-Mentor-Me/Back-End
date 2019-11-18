
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'admin', password: 'password', email: 'test@test.com', profile_type: 'admin' },
        { username: 'bigBuisnessBoi', password: 'cashmoney$$$', email: 'test34@test.com', profile_type: 'mentor' },
        { username: 'Ragnar', password: 'vikingLoRd', email: 'test3456@test.com', profile_type: 'mentor' },
        { username: 'WTBjets', password: 'JetOwner88', email: 'test7654@test.com', profile_type: 'mentor' },
        { username: 'test2', password: 'password45', email: 'test321@test.com', profile_type: 'Mentee' },
        { username: 'test7', password: 'password3', email: 'test152@test.com', profile_type: 'Mentee' },
        { username: 'test10', password: 'password2', email: 'test654@test.com', profile_type: 'Mentee' }
      ]);
    });
};
