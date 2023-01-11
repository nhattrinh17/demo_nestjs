'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: { type: 'int(11)', primaryKey: true, autoIncrement: true },
            email: { type: 'varchar(100)' },
            password: { type: 'varchar(254)' },
            phone: { type: 'varchar(15)' },
            username: { type: 'varchar(254)' },
            created_at: { type: 'DATETIME' },
            deleted_at: { type: 'DATETIME' },
            updated_at: { type: 'DATETIME' },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    },
};
