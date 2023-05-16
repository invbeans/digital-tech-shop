const { Model, ValidationError } = require('objection')
const { phone } = require('phone')
const { validate } = require('email-validator')

class MetaUser extends Model {
    static get tableName() {
        return 'meta_user'
    }

    static get idColumn() {
        return 'user';
    }

    $beforeInsert() {
        if (phone(this.phone_number, { country: 'RUS' }).isValid === false) {
            throw new ValidationError({
                message: 'Неправильно введён номер телефона'
            })
        }
        else this.phone_number = phone(this.phone_number, { country: 'RUS' }).phoneNumber
        if (!validate(this.email)) {
            throw new ValidationError({
                message: 'Неправильно введена электронная почта'
            })
        }
    }

    $beforeUpdate() {
        if(this.phone_number == undefined && this.email == undefined) return
        if (phone(this.phone_number, { country: 'RUS' }).isValid === false) {
            throw new ValidationError({
                message: 'Неправильно введён номер телефона'
            })
        }
        else this.phone_number = phone(this.phone_number, { country: 'RUS' }).phoneNumber
        if (!validate(this.email)) {
            throw new ValidationError({
                message: 'Неправильно введена электронная почта'
            })
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                user: {type: 'number'},
                phone_number: { type: 'string' },
                birthday_date: { type: 'string' },
                email: { type: 'string' },
                hashed_password: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        const Role = require('./Role')
        const User = require('./User')
        return {
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'meta_user.user',
                    to: 'user.id'
                }
            },
            role_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Role,
                join: {
                    from: 'meta_user.role',
                    to: 'role.id'
                }
            }
        }
    }
}

module.exports = MetaUser