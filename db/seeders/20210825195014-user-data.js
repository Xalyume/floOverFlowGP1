'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [
      { username: 'metalman123', email: 'metalbro@metal.com', hashedPassword: '$2a$10$NLJle3Sb4bavbGoHb7xexeQhumUbRj84gsPWNx61laMcgQ9HGapxK', createdAt: new Date('2021-6-17'), updatedAt: new Date('2021-6-17') },
      { username: 'hydroHomie21', email: 'waterisgreat@water.com', hashedPassword: '$2a$10$xlkfGhmVG2b/O14J4qxtKeSPg82OekYtll30ktLpa9vJy3.RJF.dG', createdAt: new Date('2021-6-30'), updatedAt: new Date('2021-6-30') },
      { username: 'defnotKanye', email: 'donda@donda.com', hashedPassword: '$2a$10$4aQ3NopkhWTMWXVTbZIJ..hG1lTP8AQjhEh5HMLhZ2xjj85sU82Ym', createdAt: new Date('2021-6-30'), updatedAt: new Date('2021-6-30') },
      { username: 'hypebeast360', email: 'reseller@supreme.com', hashedPassword: '$2a$10$4Wb3LYLwxtyjMUxphH6RbehrSU8zDeq4NlMsrhl/.nABFoP0/JUzO', createdAt: new Date('2021-6-30'), updatedAt: new Date('2021-6-30') },
      { username: 'WUBWUBwub', email: 'edm@edm.com', hashedPassword: '$2a$10$ZACZbuty.hEmS9EuLlJliezYjqlPbYWFBSMCu9lilrr7C28IWFSDm', createdAt: new Date('2021-7-12'), updatedAt: new Date('2021-7-12') },
      { username: 'badquestions', email: 'william@bad.com', hashedPassword: '$2a$10$D6BTUlLDaPGKA.R1zlBaAO9yhalM4JpRBzdq.9IWt0oL6UlzdCNam', createdAt: new Date('2021-6-1'), updatedAt: new Date('2021-6-1') },
      { username: 'demouser1', email: 'demo@demo.com', hashedPassword: '$2a$10$qQh0oPXvYaRMgpAUZr86o.AreddePYKbgUEW.DJbbOjY537rNMbQi', createdAt: new Date('2021-6-1'), updatedAt: new Date('2021-6-1') }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
