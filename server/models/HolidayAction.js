const { Model } = require('objection');

class HolidayAction extends Model {
    static get tableName() {
        return 'holiday_action'
    }

    static get relationMappings() {
        const Action = require('./Action')
        const SubCategory = require('./SubCategory')

        return {
            action_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Action,
                join: {
                    from: 'holiday_action.action',
                    to: 'action.id'
                }
            },
            sub_category_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: SubCategory,
                join: {
                    from: 'sub_category.id',
                    to: 'holiday_action.sub_category'
                }
            }
        }
    }
}

module.exports = HolidayAction