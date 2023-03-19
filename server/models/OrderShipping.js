const { Model } = require('objection');

class OrderShipping extends Model {
    static get tableName() {
        return 'order_shipping'
    }

    static get relationMappings() {

    }
}

module.exports = OrderShipping