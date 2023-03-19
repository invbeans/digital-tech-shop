const { Model } = require('objection');

class DistrictStreet extends Model {
    static get tableName() {
        return 'district_street'
    }

    static get relationMappings() {

    }
}

module.exports = DistrictStreet