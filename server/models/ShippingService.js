const { Model } = require('objection');

class ShippingService extends Model {
    static get tableName() {
        return 'shipping_service'
    }

    static get relationMappings() {
        const ShippingMethod = require('./ShippingMethod')
        const OrderShipping = require('./OrderShipping')

        return {
            shipping_method_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: ShippingMethod,
                join: {
                    from: 'shipping_service.shipping_method',
                    to: 'shipping_method.id'
                }
            },
            order_shipping_rel: {
                relation: Model.HasManyRelation,
                modelClass: OrderShipping,
                join: {
                    from: 'shipping_service.id',
                    to: 'order_shipping.shipping_service'
                }
            }
        }
    }
}

module.exports = ShippingService