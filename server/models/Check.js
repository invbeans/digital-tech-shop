const { Model } = require('objection');

class Check extends Model {
    static get tableName() {
        return 'check'
    }

    static get idColumn() {
        return 'order'
    }

    static get relationMappings() {
        const Order = require('./Order')
        const PaymentMethod = require('./PaymentMethod')

        return {
            order_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'check.order',
                    to: 'order.id'
                }
            },
            payment_method_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: PaymentMethod,
                join: {
                    from: 'check.payment_method',
                    to: 'payment_method.id'
                }
            }
        }
    }
}

module.exports = Check