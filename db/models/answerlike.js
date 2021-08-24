'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerLike = sequelize.define('AnswerLike', {
    vote: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  AnswerLike.associate = function(models) {
    // associations can be defined here
  };
  return AnswerLike;
};