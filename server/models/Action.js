const { Model } = require('objection');

class Action extends Model {
    static get tableName() {
        return 'action'
    }

    static get relationMappings() {
        const ActionType = require('./ActionType')

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

            }
        }
    }
}

module.exports = Action