const { Model } = require('objection');

class ShippingStatus extends Model {
    static get tableName() {
        return 'shipping_status'
    }

    static get relationMappings() {

    }
}

module.exports = ShippingStatus