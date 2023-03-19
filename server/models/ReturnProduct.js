const { Model } = require('objection');

class ReturnProduct extends Model {
    static get tableName() {
        return 'return_product'
    }

    static get relationMappings() {
        const ReturnApplication = require('./ReturnApplication')
        const Product = require('./Product')

        return {
            return_application: {
                relation: Model.BelongsToOneRelation,
                modelClass: ReturnApplication,
                join: {
                    from: 'return_product.return_application',
                    to: 'return_application.id'
                }
            },
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'return_product.product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = ReturnProduct