const { Model } = require('objection');

class Adress extends Model {
    static get tableName() {
        return 'adress'
    }

    static get relationMappings() {
        const StreetType = require('./StreetType')
        const OrderShipping = require('./OrderShipping')

        return {
            street_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: StreetType,
                join: {
                    from: 'adress.street_type',
                    to: 'street_type.id'
                }
            },
            order_shipping: {
                relation: Model.HasManyRelation,
                modelClass: OrderShipping,
                join: {
                    from: 'adress.id',
                    to: 'order_shipping.adress'
                }
            }
        }
    }
}

module.exports = Adress