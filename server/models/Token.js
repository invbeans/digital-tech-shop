const { Model, ValidationError } = require('objection');

class Token extends Model {
    static get tableName() {
        return 'token'
    }

    static get idColumn() {
        return 'user';
    }

    static get relationMappings() {
        const User = require('./User')

        return {
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'token.user',
                    to: 'user.id'
                }
            }
        }
    }
}

module.exports = Token