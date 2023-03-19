const { Model } = require('objection');

class ProductRemains extends Model {
    static get tableName() {
        return 'product_remains'
    }

    static get relationMappings() {

    }
}

module.exports = ProductRemains