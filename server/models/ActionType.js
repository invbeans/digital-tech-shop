const { Model } = require('objection');

class ActionType extends Model {
    static get tableName() {
        return 'action_type'
    }

    static get relationMappings() {
        const Action = require('./Action')
        return {
            action_rel: {
                relation: Model.HasManyRelation,
                modelClass: Action,
                join: {
                    from: 'action_type.id',
                    to: 'action.action_type'
                }
            }
        }
    }
}

module.exports = ActionType