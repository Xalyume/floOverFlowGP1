'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Answers', [
      { content: 'i dont think this is even a question....', questionId: 6, userId: 2, createdAt: new Date('2021-8-01'), updatedAt: new Date('2021-8-01') },
      { content: 'i thought there was no such thing as a bad question, i guess i was wrong', questionId: 6, userId: 4, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'i think kdot spent some time in Mongolia as a child and wanted to pay homage to his childhood', questionId: 8, userId: 3, createdAt: new Date('2021-7-30'), updatedAt: new Date('2021-7-30') },
      { content: 'not wrong, Mozart def did not have sick 808s', questionId: 13, userId: 5, createdAt: new Date('2021-8-04'), updatedAt: new Date('2021-8-04') },
      { content: 'idk i disagree, i think Mozart had some BANGERS', questionId: 13, userId: 2, createdAt: new Date('2021-8-01'), updatedAt: new Date('2021-8-01') },
      { content: 'nah not really', questionId: 7, userId: 6, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'yea totally, i think the bass line is the same?', questionId: 7, userId: 1, createdAt: new Date('2021-8-10'), updatedAt: new Date('2021-8-10') },
      { content: 'def not Kanye.', questionId: 9, userId: 5, createdAt: new Date('2021-7-25'), updatedAt: new Date('2021-7-25') },
      { content: 'I have been listening to alot of tyler lately', questionId: 9, userId: 4, createdAt: new Date('2021-7-29'), updatedAt: new Date('2021-7-29') },
      { content: 'I think anything by John Mayer is really close to that song honestly', questionId: 4, userId: 6, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'all songs are about love if you think about it', questionId: 12, userId: 1, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'whats a BMTH?', questionId: 1, userId: 2, createdAt: new Date('2021-8-04'), updatedAt: new Date('2021-8-04') },
      { content: 'so sick, glad they did some heavy stuff', questionId: 1, userId: 3, createdAt: new Date('2021-8-01'), updatedAt: new Date('2021-8-01') },
      { content: 'you belong with me is probably my favorite', questionId: 11, userId: 1, createdAt: new Date('2021-8-02'), updatedAt: new Date('2021-8-02') },
      { content: 'thunder by boys like girls, GREAT SONG', questionId: 12, userId: 5, createdAt: new Date('2021-8-9'), updatedAt: new Date('2021-8-9') },
      { content: 'The only song I can think of is Choy Suey by System of a Down', questionId: 4, userId: 1, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'Def math rock is best for drinking ice cold water', questionId: 2, userId: 1, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'Do you mean the Beatles? I only know Ringo, I think he played drums', questionId: 3, userId: 4, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'honestly I think any song by Thrice can be considered my favorite', questionId: 10, userId: 6, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'Stairway to Heaven is a masterpiece', questionId: 10, userId: 1, createdAt: new Date('2021-8-05'), updatedAt: new Date('2021-8-05') },
      { content: 'The Beatles? John, Paul, George and Ringo!', questionId: 3, userId: 5, createdAt: new Date('2021-8-11'), updatedAt: new Date('2021-8-11') },
      { content: 'Apparently its not YAK but YAWK and it was a sample from another song, not sure what it means though', questionId: 8, userId: 2, createdAt: new Date('2021-8-25'), updatedAt: new Date('2021-8-25') },
      { content: 'I honestly think both are great!', questionId: 13, userId: 7, createdAt: new Date('2021-8-03'), updatedAt: new Date('2021-8-03') },
      { content: 'i think dubstep is the best for drinking water!', questionId: 2, userId: 7, createdAt: new Date('2021-8-05'), updatedAt: new Date('2021-8-05') },
      { content: 'Great question! I think Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', questionId: 6, userId: 7, createdAt: new Date('2021-8-20'), updatedAt: new Date('2021-8-20') },
      { content: 'I have been listening to alot of ADTR lately. They\'re great!', questionId: 14, userId: 1, createdAt: new Date('2021-8-11'), updatedAt: new Date('2021-8-11') },
      { content: 'Ed Sheeran at MSG. it was epic!', questionId: 15, userId: 4, createdAt: new Date('2021-8-8'), updatedAt: new Date('2021-8-8') },
      { content: 'been listening to alot of deep house in general, not really any 1 specific artist though.', questionId: 15, userId: 5, createdAt: new Date('2021-8-22'), updatedAt: new Date('2021-8-22') }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Answers', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
