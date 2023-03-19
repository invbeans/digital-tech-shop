const { Model } = require('objection');

class Order extends Model {
    static get tableName() {
        return 'order'
    }

    static get relationMappings() {

    }
}

module.exports = Order