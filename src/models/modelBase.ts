import { sequelize } from './index';
import { ModelAttributes } from 'sequelize';

export class ModelBase {
    static model: any;
    constructor() {}
    static init(table_name: string, attributes: ModelAttributes, uniqueFields = []) {
        if (sequelize)
            this.model = sequelize.define(table_name, attributes, {
                timestamps: false,
                tableName: table_name,
                indexes: [
                    {
                        unique: true,
                        fields: uniqueFields,
                    },
                ],
            });
    }

    /**
     *
     * @param opts
     * @returns {*}
     */
    static findOne(opts: {}) {
        return this.model.findOne({ ...opts, raw: true });
    }
    static findAll(opts: {}) {
        return this.model.findAll(opts);
    }
    static count(opts: {}) {
        return this.model.count(opts);
    }
    static update(attr: any, opts: {}) {
        if (!attr.updated_at) attr.updated_at = new Date();
        console.log(attr);

        return this.model.update(attr, opts);
    }
    static create(attr: any, opts = {}) {
        if (!attr.created_at) attr.created_at = new Date();
        return this.model.create(attr, opts);
    }
    static delete(opts: {}) {
        const attr = {
            updated_at: new Date(),
            deleted_at: new Date(),
        };
        return this.model.update(attr, opts);
    }
    static destroy(opts: {}) {
        return this.model.destroy(opts);
    }
    static removeAttribute(attr: object) {
        return this.model.removeAttribute(attr);
    }
}
