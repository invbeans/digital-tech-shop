const { Model } = require('objection');

class OrderProduct extends Model {
    static get tableName() {
        return 'order_product'
    }

    static get relationMappings() {
        const Order = require('./Order')
        const Product = require('./Product')

        return {
            order_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'order_product.order',
                    to: 'order.id'
                }
            },
            product_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'order_product.product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = OrderProduct