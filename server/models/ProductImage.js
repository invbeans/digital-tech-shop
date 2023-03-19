const { Model } = require('objection');

class ProductImage extends Model {
    static get tableName() {
        return 'product_image'
    }

    static get relationMappings() {
        const Product = require('./Product')

        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'product_image.product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = ProductImage