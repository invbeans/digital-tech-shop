const { Model } = require('objection');

class ShippingService extends Model {
    static get tableName() {
        return 'shipping_service'
    }

    static get relationMappings() {

    }
}

module.exports = ShippingService