const { Model } = require('objection');

class Street extends Model {
    static get tableName() {
        return 'street'
    }

    static get relationMappings() {

    }
}

module.exports = Street