const { Model } = require('objection');

class Check extends Model {
    static get tableName() {
        return 'check'
    }

    static get relationMappings() {

    }
}

module.exports = Check