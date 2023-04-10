const { Model } = require('objection');

class SubCategory extends Model {
    static get tableName() {
        return 'sub_category'
    }

    static get relationMappings() {
        const PropertySubCategory = require('./PropertySubCategory')
        const SubCategoryAction = require('./SubCategoryAction')
        const Product = require('./Product')
        const HolidayAction = require('./HolidayAction')

        return {
            property_sub_category_rel: {
                relation: Model.HasManyRelation,
                modelClass: PropertySubCategory,
                join: {
                    from: 'sub_category.id',
                    to: 'property_sub_category.sub_category'
                }
            },
            sub_category_action_rel: {
                relation: Model.HasManyRelation,
                modelClass: SubCategoryAction,
                join: {
                    from: 'sub_category.action',
                    to: 'sub_category_action.sub_category'
                }
            },
            product_rel: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'sub_category.id',
                    to: 'product.sub_category'
                }
            },
            holiday_action_rel: {
                relation: Model.HasManyRelation,
                modelClass: HolidayAction,
                join: {
                    from: 'sub_category.id',
                    to: 'holiday_action.sub_category'
                }
            }
        }
    }
}

module.exports = SubCategory