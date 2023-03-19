const { Model } = require('objection');

class PaymentMethod extends Model {
    static get tableName() {
        return 'payment_method'
    }

    static get relationMappings() {

    }
}

module.exports = PaymentMethod