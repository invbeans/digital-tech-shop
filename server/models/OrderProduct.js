const { Model } = require('objection');

class OrderProduct extends Model {
    static get tableName() {
        return 'order_product'
    }

    static get relationMappings() {

    }
}

module.exports = OrderProduct