const { Model } = require('objection');

class OrderShipping extends Model {
    static get tableName() {
        return 'order_shipping'
    }

    static get relationMappings() {
        const Order = require('./Order')
        const ShippingService = require('./ShippingService')
        const Adress = require('./Adress')
        const PickupPointType = require('./PickupPointType')

        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'order_shipping.order',
                    to: 'order.id'
                }
            },
            shipping_service: {
                relation: Model.BelongsToOneRelation,
                modelClass: ShippingService,
                join: {
                    from: 'order_shipping.shipping_service',
                    to: 'shipping_service.id'
                }
            },
            adress: {
                relation: Model.BelongsToOneRelation,
                modelClass: Adress,
                join: {
                    from: 'order_shipping.adress',
                    to: 'adress.id'
                }
            },
            pickup_point_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: PickupPointType,
                join: {
                    from: 'order_shipping.pickup_point_type',
                    to: 'pickup_point_type.id'
                }
            }
        }
    }
}

module.exports = OrderShipping