const { Model } = require('objection');

class Supplier extends Model {
    static get tableName() {
        return 'supplier'
    }

    static get relationMappings() {

    }
}

module.exports = Supplier