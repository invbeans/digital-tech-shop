const { Model } = require('objection');

class UserActivity extends Model {
    static get tableName() {
        return 'user_activity'
    }

    static get idColumn() {
        return 'user'
    }

    static get relationMappings() {
        const User = require('./User')

        return {
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_activity.user',
                    to: 'user.id'
                }
            }
        }
    }
}

module.exports = UserActivity