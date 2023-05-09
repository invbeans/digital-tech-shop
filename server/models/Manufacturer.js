const { Model, ValidationError } = require('objection')
const { validate } = require('email-validator')

class Manufacturer extends Model {
    static get tableName() {
        return 'manufacturer'
    }

    $beforeInsert() {
        if(!validate(this.email)){
            throw new ValidationError({
                message: 'Неправильно введена электронная почта'
            })
        }
    }

    $beforeUpdate(){
        if(!validate(this.email)){
            throw new ValidationError({
                message: 'Неправильно введена электронная почта'
            })
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                email: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        const BrandAction = require('./BrandAction')
        const Product = require('./Product')

        return {
            brand_action_rel: {
                relation: Model.HasManyRelation,
                modelClass: BrandAction,
                join: {
                    from: 'manufacturer.id',
                    to: 'brand_action.manufacturer'
                }
            },
            product_rel: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'manufacturer.id',
                    to: 'product.manufacturer'
                }
            }
        }
    }
}

module.exports = Manufacturer