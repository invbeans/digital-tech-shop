const { Model } = require('objection');

class PropertyValue extends Model {
    static get tableName() {
        return 'property_value'
    }

    static get relationMappings() {

    }
}

module.exports = PropertyValue