const { Model } = require('objection');

class Supplier extends Model {
    static get tableName() {
        return 'supplier'
    }

    static get relationMappings() {
        const Product = require('./Product')

        return {
            product: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'supplier.id',
                    to: 'product.supplier'
                }
            }
        }
    }
}

module.exports = Supplier