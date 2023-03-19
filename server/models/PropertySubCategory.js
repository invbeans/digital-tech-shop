const { Model } = require('objection');

class PropertySubCategory extends Model {
    static get tableName() {
        return 'property_sub_category'
    }

    static get relationMappings() {
        const Property = require('./Property')
        const SubCategory = require('./SubCategory')

        return {
            property: {
                relation: Model.BelongsToOneRelation,
                modelClass: Property,
                join: {
                    from: 'property_sub_category.property',
                    to: 'property.id'
                }
            },
            sub_category: {
                relation: Model.BelongsToOneRelation,
                modelClass: SubCategory,
                join: {
                    from: 'property_sub_category.sub_category',
                    to: 'sub_category.id'
                }
            }
        }
    }
}

module.exports = PropertySubCategory