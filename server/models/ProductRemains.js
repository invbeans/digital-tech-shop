const { Model } = require('objection');

class ProductRemains extends Model {
    static get tableName() {
        return 'product_remains'
    }

    static get relationMappings() {
        const Product = require('./Product')

        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'product_remains.product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = ProductRemains