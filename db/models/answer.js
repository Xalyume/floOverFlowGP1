'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User, { foreignKey: 'userId'});
    Answer.belongsTo(models.Question, { foreignKey: 'questionId'});

    // only doing this to clean answerLikes table when answer is deleted, associated answerlikes are deleted
    Answer.hasMany(models.AnswerLike, { foreignKey: 'answerId', onDelete: 'CASCADE', hooks: true });


    const answerMapping = {
      through: 'AnswerLike',
      otherKey: 'userId',
      foreignKey: 'answerId',
      as: 'AnswersLikes'
    }
    Answer.belongsToMany(models.User, answerMapping);
  };
  return Answer;
};
