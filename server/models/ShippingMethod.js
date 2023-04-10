const { Model } = require('objection');

class ShippingMethod extends Model {
    static get tableName() {
        return 'shipping_method'
    }

    static get relationMappings() {
        const ShippingService = require('./ShippingService')

        return {
            shipping_service_rel: {
                relation: Model.HasManyRelation,
                modelClass: ShippingService,
                join: {
                    from: 'shipping_method.id',
                    to: 'shipping_service.shipping_method'
                }
            }
        }
    }
}

module.exports = ShippingMethod