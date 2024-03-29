const { Model } = require('objection');

class SubCategoryAction extends Model {
    static get tableName() {
        return 'sub_category_action'
    }

    static get idColumn() {
        return 'action'
    }

    static get relationMappings() {
        const SubCategory = require('./SubCategory')
        const Action = require('./Action')

        return {
            sub_category_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: SubCategory,
                join: {
                    from: 'sub_category_action.sub_category',
                    to: 'sub_category.id'
                }
            },
            action_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Action,
                join: {
                    from: 'sub_category_action.action',
                    to: 'action.id'
                }
            }
        }
    }
}

module.exports = SubCategoryAction