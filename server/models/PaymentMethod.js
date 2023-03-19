const { Model } = require('objection');

class PaymentMethod extends Model {
    static get tableName() {
        return 'payment_method'
    }

    static get relationMappings() {
        const Check = require('./Check')

        return {
            check: {
                relation: Model.HasManyRelation,
                modelClass: Check,
                join: {
                    from: 'payment_method.id',
                    to: 'check.payment_method'
                }
            }
        }
    }
}

module.exports = PaymentMethod