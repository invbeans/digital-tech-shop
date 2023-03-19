const { Model } = require('objection');

class City extends Model {
    static get tableName() {
        return 'city'
    }

    static get relationMappings() {

    }
}

module.exports = City