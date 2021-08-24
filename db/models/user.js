'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Question, { foreignKey: 'userId'  });
    User.hasMany(models.Answer, { foreignKey: 'userId' });

    const questionMapping = {
      through: 'QuestionLike',
      otherKey: 'questionId',
      foreignKey: 'userId',
      as: 'UserQuestionLikes'
    }
    User.belongsToMany(models.Question, questionMapping );

    const answerMapping = {
      through: 'AnswerLike',
      otherKey: 'answerId',
      foreignKey: 'userId',
      as: 'UserAnswerLikes'
    }
    User.belongsToMany(models.Answer, answerMapping);



  };

  return User;
};
