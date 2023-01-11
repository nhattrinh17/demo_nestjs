'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('users', {
            type: 'unique',
            name: 'unique_constraint_username',
            fields: ['username'],
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('users', ['username']);
    },
};
