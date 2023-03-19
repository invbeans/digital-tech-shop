const { Model } = require('objection');

class StreetType extends Model {
    static get tableName() {
        return 'street_type'
    }

    static get relationMappings() {
        const Adress = require('./Adress')

        return {
            street_type: {
                relation: Model.HasManyRelation,
                modelClass: Adress,
                join: {
                    from: 'street_type.id',
                    to: 'adress.street_type'
                }
            }
        }
    }
}

module.exports = StreetType