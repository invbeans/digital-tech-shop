const { Model } = require('objection');

class Basket extends Model {
    static get tableName() {
        return 'basket'
    }

    static get relationMappings() {

    }
}

module.exports = Basket