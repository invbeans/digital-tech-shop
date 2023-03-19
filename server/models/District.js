const { Model } = require('objection');

class District extends Model {
    static get tableName() {
        return 'district'
    }

    static get relationMappings() {

    }
}

module.exports = District