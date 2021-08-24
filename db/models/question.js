'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'userId'});
    Question.hasMany(models.Answer, { foreignKey: 'questionId', onDelete: 'CASCADE', hooks: true });
    //question hasmany likes with cascade deleting, to keep db clean,  but no cascade deleting  on questionlike;
    Question.hasMany(models.QuestionLike, { foreignKey: 'questionId', onDelete: 'CASCADE', hooks: true });

    const columnMapping = {
      through: 'QuestionLike',
      otherKey: 'userId',
      foreignKey: 'questionId',
      as: 'QuestionsLikes',

    }
    Question.belongsToMany(models.User, columnMapping);
  };
  return Question;
};
