const { Model } = require('objection');

class ShippingHistory extends Model {
    static get tableName() {
        return 'shipping_history'
    }

    static get relationMappings() {
        const Order = require('./Order')
        const ShippingStatus = require('./ShippingStatus')

        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'shipping_history.order',
                    to: 'order.id'
                }
            },
            shipping_status: {
                relation: Model.BelongsToOneRelation,
                modelClass: ShippingStatus,
                join: {
                    from: 'shipping_history.shipping_status',
                    to: 'shipping_status.id'
                }
            }
        }
    }
}

module.exports = ShippingHistory