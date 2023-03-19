const { Model } = require('objection');

class ReturnProduct extends Model {
    static get tableName() {
        return 'return_product'
    }

    static get relationMappings() {

    }
}

module.exports = ReturnProduct