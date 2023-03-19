const { Model } = require('objection');

class Property extends Model {
    static get tableName() {
        return 'property'
    }

    static get relationMappings() {

    }
}

module.exports = Property