const { Model, ValidationError } = require('objection');

class Action extends Model {
    static get tableName() {
        return 'action'
    }

    $beforeInsert() {
        let temp_begin = new Date(this.date_begin).getTime()
        let temp_end = new Date(this.date_end).getTime()
        if(temp_begin > temp_end){
            throw new ValidationError({
                message: 'Дата окончания не может быть раньше даты начала'
            })
        }
        if(this.percent <= 0){
            throw new ValidationError({
                message: 'Неккоректный процент акции'
            })
        }
    }

    static get jsonSchema() {
        return{
            type: 'object',
            properties: {
                date_begin: {type: 'string'},
                date_end: {type: 'string'},
                percent: {type: 'integer'}
            }
        }
    }

    static get relationMappings() {
        const ActionType = require('./ActionType')
        const SubCategoryAction = require('./SubCategoryAction')
        const HolidayAction = require('./HolidayAction')
        const DoubleAction = require('./DoubleAction')
        const BrandAction = require('./BrandAction')

        return {
            action_type_rel: { //relation name and join property 'action_type' cannot have the same name
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