const { Model } = require('objection');

class UserProfile extends Model {
    static get tableName() {
        return 'user_profile'
    }

    static get relationMappings() {
        const User = require('./User')

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_profile.user',
                    to: 'user.id'
                }
            }
        }
    }
}

module.exports = UserProfile