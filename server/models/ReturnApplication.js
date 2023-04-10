const { Model } = require('objection');

class ReturnApplication extends Model {
    static get tableName() {
        return 'return_application'
    }

    static get relationMappings() {
        const ReturnProduct = require('./ReturnProduct')
        const Order = require('./Order')

        return {
            return_product_rel: {
                relation: Model.HasManyRelation,
                modelClass: ReturnProduct,
                join: {
                    from: 'return_application.id',
                    to: 'return_product.return_application'
                }
            },
            order_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'return_application.order',
                    to: 'order.id'
                }
            }
        }
    }
}

module.exports = ReturnApplication