'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('users', {
            type: 'unique',
            name: 'unique_constraint_email',
            fields: ['email'],
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('users', ['email']);
    },
};
