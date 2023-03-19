const { Model } = require('objection');

class StreetType extends Model {
    static get tableName() {
        return 'street_type'
    }

    static get relationMappings() {

    }
}

module.exports = StreetType