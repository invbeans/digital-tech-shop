const { Model, ValidationError } = require('objection');

class ProductRemains extends Model {
    static get tableName() {
        return 'product_remains'
    }

    static get idColumn() {
        return 'product'
    }

    $beforeInsert() {
        if (this.amount < 0) {
            throw new ValidationError({
                message: 'Неккоректное количество товара'
            })
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                amount: { type: 'integer' }
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
                    from: 'product_remains.product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = ProductRemains