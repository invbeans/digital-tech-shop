const { Model } = require('objection');

class PickupPointType extends Model {
    static get tableName() {
        return 'pickup_point_type'
    }

    static get relationMappings() {

    }
}

module.exports = PickupPointType