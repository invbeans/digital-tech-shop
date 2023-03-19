const { Model } = require('objection');

class ShippingHistory extends Model {
    static get tableName() {
        return 'shipping_history'
    }

    static get relationMappings() {

    }
}

module.exports = ShippingHistory