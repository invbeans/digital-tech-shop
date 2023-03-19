const { Model } = require('objection');

class BasketProduct extends Model {
    static get tableName() {
        return 'basket_product'
    }

    static get relationMappings() {

    }
}

module.exports = BasketProduct