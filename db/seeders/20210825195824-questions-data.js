'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Questions', [
      { content: 'What do you guys think about the new BMTH record?', userId: 1, createdAt: new Date('2021-7-30'), updatedAt: new Date('2021-7-30') },
      { content: 'What genre do you guys think is better for drinking water? Pop Punk or Alternative Math Rock Jazz?', userId: 2, createdAt: new Date('2021-7-01'), updatedAt: new Date('2021-7-01') },
      { content: 'who were the band members for that one band named after an insect again?', userId: 3, createdAt: new Date('2021-7-10'), updatedAt: new Date('2021-7-10') },
      { content: 'similar songs to \'You Suffer\' by Napalm Death?', userId: 4, createdAt: new Date('2021-7-11'), updatedAt: new Date('2021-7-11') },
      { content: 'what do you guys think about marshmellos new album?', userId: 5, createdAt: new Date('2021-7-20'), updatedAt: new Date('2021-7-20') },
      { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', userId: 6, createdAt: new Date('2021-7-14'), updatedAt: new Date('2021-7-14') },
      { content: 'do you guys also hear the similarities in Skrillex\'s Bangarang to Beethoven\'s Pathetique', userId: 5, createdAt: new Date('2021-7-22'), updatedAt: new Date('2021-7-22') },
      { content: 'what do you guys think Kdot was trying to convey when he wrote "YAK YAK YAK YAK" in maad city?', userId: 4, createdAt: new Date('2021-7-23'), updatedAt: new Date('2021-7-23') },
      { content: 'who are some of your favorite hip-hop artists?', userId: 3, createdAt: new Date('2021-7-24'), updatedAt: new Date('2021-7-24') },
      { content: 'What is your favorite song of all time?', userId: 2, createdAt: new Date('2021-7-23'), updatedAt: new Date('2021-7-23') },
      { content: 'Can someone recommend me their preferred Taylor Swift songs?', userId: 1, createdAt: new Date('2021-7-20'), updatedAt: new Date('2021-7-20') },
      { content: 'recommend me songs with themes about love', userId: 2, createdAt: new Date('2021-7-17'), updatedAt: new Date('2021-7-17') },
      { content: 'why is Kanye better than Mozart?', userId: 3, createdAt: new Date('2021-7-2'), updatedAt: new Date('2021-7-2') },
      { content: 'Who or what have been you been listening to alot lately?', userId: 7, createdAt: new Date('2021-7-27T07:45:00'), updatedAt: new Date('2021-7-27T07:45:00') },
      { content: 'what was your best memorable concert experience?', userId: 7, createdAt: new Date('2021-8-10T07:45:00'), updatedAt: new Date('2021-8-10T07:45:00') }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Questions', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
