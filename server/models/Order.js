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
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'order.user',
                    to: 'user.id'
                }
            },
            shipping_history_rel: {
                relation: Model.HasManyRelation,
                modelClass: ShippingHistory,
                join: {
                    from: 'order.id',
                    to: 'shipping_history.order'
                }
            },
            order_shipping_rel: {
                relation: Model.HasOneRelation,
                modelClass: OrderShipping,
                join: {
                    from: 'order.id',
                    to: 'order_shipping.order'
                }
            },
            order_product_rel: {
                relation: Model.HasManyRelation,
                modelClass: OrderProduct,
                join: {
                    from: 'order.id',
                    to: 'order_product.order'
                }
            },
            return_application_rel: {
                relation: Model.HasManyRelation,
                modelClass: ReturnApplication,
                join: {
                    from: 'order.id',
                    to: 'return_application.order'
                }
            },
            check_rel: {
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