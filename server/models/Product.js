const { Model } = require('objection');

class Product extends Model {
    static get tableName() {
        return 'product'
    }

    static get relationMappings() {

    }
}

module.exports = Product