const { Model } = require('objection');

class ProductImage extends Model {
    static get tableName() {
        return 'product_image'
    }

    static get idColumn() {
        return 'product'
    }

    static get jsonSchema() {
        return{
            type: 'object',
            properties: {
                image_link: {type: 'string'}
            }
        }
    }

    static get relationMappings() {
        const Product = require('./Product')

        return {
            product_rel: {
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