const { Model } = require('objection');

class Order extends Model {
    static get tableName() {
        return 'order'
    }

    static get relationMappings() {
        const User = require('./User')
        const ShippingHistory = require('./ShippingHistory')
        const OrderShipping = require('./OrderShipping')
        const OrderProduct = require('./OrderProduct')
        const ReturnApplication = require('./ReturnApplication')
        const Check = require('./Check')

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'order.user',
                    to: 'user.id'
                }
            },
            shipping_history: {
                relation: Model.HasManyRelation,
                modelClass: ShippingHistory,
                join: {
                    from: 'order.id',
                    to: 'shipping_history.order'
                }
            },
            order_shipping: {
                relation: Model.HasOneRelation,
                modelClass: OrderShipping,
                join: {
                    from: 'order.id',
                    to: 'order_shipping.order'
                }
            },
            order_product: {
                relation: Model.HasManyRelation,
                modelClass: OrderProduct,
                join: {
                    from: 'order.id',
                    to: 'order_product.order'
                }
            },
            return_application: {
                relation: Model.HasManyRelation,
                modelClass: ReturnApplication,
                join: {
                    from: 'order.id',
                    to: 'return_application.order'
                }
            },
            check: {
                relation: Model.HasOneRelation,
                modelClass: Check,
                join: {
                    from: 'order.id',
                    to: 'check.order'
                }
            }
        }
    }
}

module.exports = Order