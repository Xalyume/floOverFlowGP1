'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionLike = sequelize.define('QuestionLike', {
    vote: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  QuestionLike.associate = function(models) {
    // associations can be defined here
  };
  return QuestionLike;
};