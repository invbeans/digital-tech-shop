const { Model } = require('objection');

class OrderShipping extends Model {
    static get tableName() {
        return 'order_shipping'
    }

    static get idColumn() {
        return 'order'
    }

    static get relationMappings() {
        const Order = require('./Order')
        const ShippingService = require('./ShippingService')
        const Adress = require('./Adress')
        const PickupPointType = require('./PickupPointType')

        return {
            order_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'order_shipping.order',
                    to: 'order.id'
                }
            },
            shipping_service_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: ShippingService,
                join: {
                    from: 'order_shipping.shipping_service',
                    to: 'shipping_service.id'
                }
            },
            adress_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Adress,
                join: {
                    from: 'order_shipping.adress',
                    to: 'adress.id'
                }
            },
            pickup_point_type_rel: {
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