const { Model } = require('objection');

class UserActivity extends Model {
    static get tableName() {
        return 'user_activity'
    }

    static get relationMappings() {
        const User = require('./User')

        return {
            user: {
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