const { Model } = require('objection');

class PropertyValue extends Model {
    static get tableName() {
        return 'property_value'
    }

    static get relationMappings() {
        const Property = require('./Property')
        const ProductPropertyValues = require('./ProductPropertyValues')

        return {
            property_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Property,
                join: {
                    from: 'property_value.property',
                    to: 'property.id'
                }
            },
            product_property_values_rel: {
                relation: Model.HasManyRelation,
                modelClass: ProductPropertyValues,
                join: {
                    from: 'property_value.id',
                    to: 'product_property_values.property_value'
                }
            }
        }
    }
}

module.exports = PropertyValue