const { Model } = require('objection');

class DistrictCity extends Model {
    static get tableName() {
        return 'district_city'
    }

    static get relationMappings() {

    }
}

module.exports = DistrictCity