const { Model } = require('objection');

class Action extends Model {
    static get tableName() {
        return 'action'
    }

    static get relationMappings() {
        const ActionType = require('./ActionType')
        const SubCategoryAction = require('./SubCategoryAction')
        const HolidayAction = require('./HolidayAction')
        const DoubleAction = require('./DoubleAction')
        const BrandAction = require('./BrandAction')

        return {
            action_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: ActionType,
                join: {
                    from: 'action.action_type',
                    to: 'action_type.id'
                }
            },
            sub_category_action: {
                relation: Model.HasOneRelation,
                modelClass: SubCategoryAction,
                join: {
                    from: 'action.id',
                    to: 'sub_category_action.action'
                }
            },
            holiday_action: {
                relation: Model.HasManyRelation,
                modelClass: HolidayAction,
                join: {
                    from: 'action.id',
                    to: 'holiday_action.action'
                }
            },
            double_action: {
                relation: Model.HasOneRelation,
                modelClass: DoubleAction,
                join: {
                    from: 'action.id',
                    to: 'double_action.action'
                }
            },
            brand_action: {
                relation: Model.HasOneRelation,
                modelClass: BrandAction,
                join: {
                    from: 'action.id',
                    to: 'brand_action.action'
                }
            }
        }
    }
}

module.exports = Action