const { Model } = require('objection');

class ShippingStatus extends Model {
    static get tableName() {
        return 'shipping_status'
    }

    static get relationMappings() {
        const ShippingHistory = require('./ShippingHistory')

        return {
            shipping_history: {
                relation: Model.HasManyRelation,
                modelClass: ShippingHistory,
                join: {
                    from: 'shipping_status.id',
                    to: 'shipping_history.shipping_status'
                }
            }
        }
    }
}

module.exports = ShippingStatus