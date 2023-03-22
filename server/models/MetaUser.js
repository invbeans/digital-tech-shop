const { Model, objection } = require('objection')
const { phone } = require('phone')
const { validator } = require('email-validator')

class MetaUser extends Model {
    static get tableName() {
      return 'meta_user'
    }
    $beforeInsert() {
        if(phone(this.phone_number, {country: 'RUS'}).isValid === false){
            throw new objection.ValidationError({ 
                message: 'Неправильно введён номер телефона'
            })
        }
        else this.phone_number = phone(this.phone_number, {country: 'RUS'}).phoneNumber
        if(!validator.validate(this.email)){
            throw new objection.ValidationError({
                message: 'Неправильно введена электронная почта'
            })
        }
    }

    static get jsonSchema() {
        return{
            type: 'object',
            properties: {
                phone_number: {type: 'string', minLength: 20, maxLength: 30},
                birthday_date: {type: 'string'},
                email: {type: 'string'}
            }
        }
    }

    static get relationMappings() {
        const Role = require('./Role')
        const User = require('./User')
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'meta_user.user',
                    to: 'user.id'
                }
            },
            role: {
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