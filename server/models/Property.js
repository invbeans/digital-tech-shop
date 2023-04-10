const { Model } = require('objection');

class Property extends Model {
    static get tableName() {
        return 'property'
    }

    static get relationMappings() {
        const PropertySubCategory = require('./PropertySubCategory')
        const PropertyValue = require('./PropertyValue')

        return {
            property_sub_category_rel: {
                relation: Model.HasManyRelation,
                modelClass: PropertySubCategory,
                join: {
                    from: 'property.id',
                    to: 'property_sub_category.property'
                }
            },
            property_value_rel: {
                relation: Model.HasManyRelation,
                modelClass: PropertyValue,
                join: {
                    from: 'property.id',
                    to: 'property_value.property'
                }
            }
        }
    }
}

module.exports = Property