'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('AnswerLikes', [
      { vote: true, userId: 1, answerId: 1 },
      { vote: false, userId: 1, answerId: 2 },
      { vote: true, userId: 1, answerId: 5 },
      { vote: true, userId: 1, answerId: 10 },
      { vote: false, userId: 1, answerId: 22 },
      { vote: true, userId: 1, answerId: 18 },
      { vote: true, userId: 1, answerId: 9 },
      { vote: true, userId: 1, answerId: 6 },
      { vote: false, userId: 1, answerId: 19 },
      { vote: true, userId: 1, answerId: 17 },
      { vote: true, userId: 1, answerId: 6 },
      { vote: true, userId: 1, answerId: 3 },
      { vote: false, userId: 1, answerId: 4 },
      { vote: false, userId: 1, answerId: 14 },
      { vote: true, userId: 2, answerId: 1 },
      { vote: false, userId: 2, answerId: 2 },
      { vote: true, userId: 2, answerId: 3 },
      { vote: true, userId: 2, answerId: 4 },
      { vote: false, userId: 2, answerId: 5 },
      { vote: false, userId: 2, answerId: 6 },
      { vote: true, userId: 2, answerId: 7 },
      { vote: false, userId: 2, answerId: 8 },
      { vote: true, userId: 2, answerId: 22 },
      { vote: true, userId: 2, answerId: 21 },
      { vote: true, userId: 2, answerId: 20 },
      { vote: true, userId: 2, answerId: 19 },
      { vote: true, userId: 2, answerId: 18 },
      { vote: false, userId: 2, answerId: 17 },
      { vote: true, userId: 2, answerId: 16 },
      { vote: true, userId: 2, answerId: 15 },
      { vote: false, userId: 2, answerId: 14 },
      { vote: false, userId: 3, answerId: 10 },
      { vote: true, userId: 3, answerId: 11 },
      { vote: true, userId: 3, answerId: 12 },
      { vote: true, userId: 3, answerId: 13 },
      { vote: true, userId: 3, answerId: 14 },
      { vote: true, userId: 3, answerId: 15 },
      { vote: true, userId: 3, answerId: 1 },
      { vote: false, userId: 3, answerId: 2 },
      { vote: true, userId: 3, answerId: 3 },
      { vote: true, userId: 3, answerId: 4 },
      { vote: true, userId: 3, answerId: 5 },
      { vote: true, userId: 3, answerId: 6 },
      { vote: false, userId: 3, answerId: 7 },
      { vote: true, userId: 3, answerId: 8 },
      { vote: true, userId: 3, answerId: 9 },
      { vote: true, userId: 4, answerId: 20 },
      { vote: true, userId: 4, answerId: 19 },
      { vote: false, userId: 4, answerId: 18 },
      { vote: true, userId: 4, answerId: 17 },
      { vote: true, userId: 4, answerId: 16 },
      { vote: true, userId: 4, answerId: 15 },
      { vote: true, userId: 4, answerId: 14 },
      { vote: true, userId: 4, answerId: 13 },
      { vote: true, userId: 4, answerId: 12 },
      { vote: false, userId: 4, answerId: 11 },
      { vote: true, userId: 4, answerId: 10 },
      { vote: true, userId: 4, answerId: 9 },
      { vote: false, userId: 4, answerId: 8 },
      { vote: false, userId: 5, answerId: 1 },
      { vote: true, userId: 5, answerId: 3 },
      { vote: true, userId: 5, answerId: 5 },
      { vote: true, userId: 5, answerId: 7 },
      { vote: true, userId: 5, answerId: 9 },
      { vote: true, userId: 5, answerId: 11 },
      { vote: true, userId: 5, answerId: 13 },
      { vote: false, userId: 5, answerId: 15 },
      { vote: false, userId: 5, answerId: 17 },
      { vote: true, userId: 5, answerId: 19 },
      { vote: true, userId: 5, answerId: 21 },
      { vote: true, userId: 5, answerId: 2 },
      { vote: true, userId: 5, answerId: 4 },
      { vote: false, userId: 5, answerId: 6 },
      { vote: false, userId: 5, answerId: 8 },
      { vote: true, userId: 5, answerId: 10 },
      { vote: true, userId: 5, answerId: 12 },
      { vote: false, userId: 5, answerId: 14 },
      { vote: true, userId: 5, answerId: 16 },
      { vote: true, userId: 6, answerId: 22 },
      { vote: false, userId: 6, answerId: 20 },
      { vote: true, userId: 6, answerId: 18 },
      { vote: false, userId: 6, answerId: 16 },
      { vote: true, userId: 6, answerId: 14 },
      { vote: true, userId: 6, answerId: 12 },
      { vote: false, userId: 6, answerId: 10 },
      { vote: true, userId: 6, answerId: 8 },
      { vote: true, userId: 6, answerId: 6 },
      { vote: false, userId: 6, answerId: 4 },
      { vote: false, userId: 6, answerId: 2 },
      { vote: true, userId: 6, answerId: 1 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('AnswerLikes', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};