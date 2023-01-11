'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('users', {
            type: 'unique',
            name: 'unique_constraint_phone',
            fields: ['phone'],
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('users', ['phone']);
    },
};
