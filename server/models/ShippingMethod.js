const { Model } = require('objection');

class ShippingMethod extends Model {
    static get tableName() {
        return 'shipping_method'
    }

    static get relationMappings() {
        const ShippingService = require('./ShippingService')

        return {
            shipping_service: {
                relation: Model.HasManyRelation,
                modelClass: Order,
                join: {
                    from: 'shipping_method.id',
                    to: 'shipping_service.shipping_method'
                }
            }
        }
    }
}

module.exports = ShippingMethod