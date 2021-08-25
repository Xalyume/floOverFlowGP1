'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('QuestionLikes', [
      { vote: true, userId: 1, questionId: 1 },
      { vote: true, userId: 2, questionId: 1 },
      { vote: false, userId: 3, questionId: 1 },
      { vote: true, userId: 4, questionId: 1 },
      { vote: true, userId: 6, questionId: 1 },
      { vote: false, userId: 1, questionId: 2 },
      { vote: true, userId: 2, questionId: 2 },
      { vote: true, userId: 3, questionId: 2 },
      { vote: false, userId: 4, questionId: 2 },
      { vote: true, userId: 5, questionId: 2 },
      { vote: false, userId: 6, questionId: 2 },
      { vote: true, userId: 1, questionId: 3 },
      { vote: true, userId: 2, questionId: 3 },
      { vote: false, userId: 3, questionId: 3 },
      { vote: true, userId: 4, questionId: 3 },
      { vote: true, userId: 6, questionId: 3 },
      { vote: true, userId: 1, questionId: 4 },
      { vote: true, userId: 2, questionId: 4 },
      { vote: false, userId: 3, questionId: 4 },
      { vote: false, userId: 1, questionId: 5 },
      { vote: false, userId: 2, questionId: 5 },
      { vote: true, userId: 3, questionId: 5 },
      { vote: true, userId: 4, questionId: 5 },
      { vote: true, userId: 5, questionId: 5 },
      { vote: false, userId: 1, questionId: 6 },
      { vote: false, userId: 2, questionId: 6 },
      { vote: false, userId: 3, questionId: 6 },
      { vote: false, userId: 4, questionId: 6 },
      { vote: false, userId: 5, questionId: 6 },
      { vote: true, userId: 1, questionId: 7 },
      { vote: true, userId: 2, questionId: 7 },
      { vote: false, userId: 3, questionId: 7 },
      { vote: true, userId: 4, questionId: 7 },
      { vote: true, userId: 5, questionId: 7 },
      { vote: false, userId: 6, questionId: 7 },
      { vote: true, userId: 1, questionId: 8 },
      { vote: true, userId: 2, questionId: 8 },
      { vote: true, userId: 3, questionId: 8 },
      { vote: false, userId: 4, questionId: 8 },
      { vote: true, userId: 5, questionId: 8 },
      { vote: false, userId: 6, questionId: 8 },
      { vote: true, userId: 1, questionId: 9 },
      { vote: true, userId: 2, questionId: 9 },
      { vote: true, userId: 3, questionId: 9 },
      { vote: false, userId: 4, questionId: 9 },
      { vote: true, userId: 5, questionId: 9 },
      { vote: false, userId: 6, questionId: 9 },
      { vote: true, userId: 1, questionId: 10 },
      { vote: true, userId: 2, questionId: 10 },
      { vote: false, userId: 3, questionId: 10 },
      { vote: true, userId: 6, questionId: 10 },
      { vote: false, userId: 1, questionId: 11 },
      { vote: true, userId: 2, questionId: 11 },
      { vote: true, userId: 3, questionId: 11 },
      { vote: true, userId: 4, questionId: 11 },
      { vote: true, userId: 5, questionId: 11 },
      { vote: false, userId: 6, questionId: 11 },
      { vote: true, userId: 1, questionId: 12 },
      { vote: true, userId: 2, questionId: 12 },
      { vote: true, userId: 3, questionId: 12 },
      { vote: true, userId: 4, questionId: 12 },
      { vote: false, userId: 5, questionId: 12 },
      { vote: false, userId: 6, questionId: 12 },
      { vote: true, userId: 1, questionId: 13 },
      { vote: true, userId: 3, questionId: 13 },
      { vote: false, userId: 4, questionId: 13 },
      { vote: true, userId: 5, questionId: 13 },
      { vote: true, userId: 6, questionId: 13 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('QuestionLikes', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
