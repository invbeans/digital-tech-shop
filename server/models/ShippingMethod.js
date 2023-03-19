const { Model } = require('objection');

class ShippingMethod extends Model {
    static get tableName() {
        return 'shipping_method'
    }

    static get relationMappings() {

    }
}

module.exports = ShippingMethod