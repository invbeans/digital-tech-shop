const { Model } = require('objection');

class Manufacturer extends Model {
    static get tableName() {
        return 'manufacturer'
    }

    static get relationMappings() {
        const BrandAction = require('./BrandAction')
        const Product = require('./Product')

        return {
            brand_action: {
                relation: Model.HasManyRelation,
                modelClass: BrandAction,
                join: {
                    from: 'manufacturer.id',
                    to: 'brand_action.manufacturer'
                }
            },
            product: {
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