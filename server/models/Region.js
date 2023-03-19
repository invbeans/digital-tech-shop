const { Model } = require('objection');

class Region extends Model {
    static get tableName() {
        return 'region'
    }

    static get relationMappings() {

    }
}

module.exports = Region