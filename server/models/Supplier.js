const { Model, ValidationError } = require('objection')
const { phone } = require('phone')
const { validate } = require('email-validator')

class Supplier extends Model {
    static get tableName() {
        return 'supplier'
    }

    $beforeInsert() {
        if(phone(this.phone, {country: 'RUS'}).isValid === false){
            throw new ValidationError({ 
                message: 'Неправильно введён номер телефона'
            })
        }
        else this.phone = phone(this.phone, {country: 'RUS'}).phoneNumber
        if(!validate(this.email)){
            throw new ValidationError({
                message: 'Неправильно введена электронная почта'
            })
        }
    }

    $beforeUpdate() {
        if(phone(this.phone, {country: 'RUS'}).isValid === false){
            throw new ValidationError({ 
                message: 'Неправильно введён номер телефона'
            })
        }
        else this.phone = phone(this.phone, {country: 'RUS'}).phoneNumber
        if(!validate(this.email)){
            throw new ValidationError({
                message: 'Неправильно введена электронная почта'
            })
        }
    }

    static get jsonSchema() {
        return{
            type: 'object',
            properties: {
                phone: {type: 'string'},
                email: {type: 'string'}
            }
        }
    }

    static get relationMappings() {
        const Product = require('./Product')

        return {
            product_rel: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'supplier.id',
                    to: 'product.supplier'
                }
            }
        }
    }
}

module.exports = Supplier