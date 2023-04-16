const { Model } = require('objection');

class ProductPropertyValue extends Model {
    static get tableName() {
        return 'product_property_values'
    }

    static get idColumn() {
        return 'product'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                product: { type: 'number' }
            }
        }
    }

    static get relationMappings() {
        const Product = require('./Product')
        const PropertyValue = require('./PropertyValue')

        return {
            product_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'product_property_values.product',
                    to: 'product.id'
                }
            },
            property_value_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: PropertyValue,
                join: {
                    from: 'product_property_values.property_value',
                    to: 'property_value.id'
                }
            }
        }
    }
}

module.exports = ProductPropertyValue