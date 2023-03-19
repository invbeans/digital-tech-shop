const { Model } = require('objection');

class DoubleAction extends Model {
    static get tableName() {
        return 'double_action'
    }

    static get relationMappings() {
        const Action = require('./Action')
        const Product = require('./Product')

        return {
            action: {
                relation: Model.BelongsToOneRelation,
                modelClass: Action,
                join: {
                    from: 'double_action.action',
                    to: 'action.id'
                }
            },
            full_price_product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'double_action.full_price_product',
                    to: 'product.id'
                }
            },
            discount_product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'double_action.discount_product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = DoubleAction