import { ModelBase } from './modelBase';

class Users extends ModelBase {}

Users.init(
    'users',
    {
        id: { type: 'int(11)', primaryKey: true },
        email: { type: 'varchar(100)' },
        password: { type: 'varchar(254)' },
        phone: { type: 'varchar(15)' },
        username: { type: 'varchar(254)' },
        created_at: { type: 'DATETIME' },
        deleted_at: { type: 'DATETIME' },
        updated_at: { type: 'DATETIME' },
    },
    ['email', 'phone', 'username'],
);

export default Users;
