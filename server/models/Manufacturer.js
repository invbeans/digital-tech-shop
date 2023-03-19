const { Model } = require('objection');

class Manufacturer extends Model {
    static get tableName() {
        return 'manufacturer'
    }

    static get relationMappings() {

    }
}

module.exports = Manufacturer