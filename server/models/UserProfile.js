const { Model, ValidationError } = require('objection');

class UserProfile extends Model {
    static get tableName() {
        return 'user_profile'
    }

    static get idColumn() {
        return 'user';
    }

    $beforeInsert() {
        let onlyRussian = new RegExp('^[А-Яа-яёЁ]+$')
        if (onlyRussian.test(this.firstname) === false) {
            throw new ValidationError({
                message: 'Используйте символы кириллицы для вашего имени'
            })
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                firstname: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        const User = require('./User')

        return {
            user_rel: {
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