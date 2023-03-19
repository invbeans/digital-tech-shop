const { Model } = require('objection');

class Street extends Model {
    static get tableName() {
        return 'street'
    }

    static get relationMappings() {
        const DistrictStreet = require('./DistrictStreet')

        return {
            district_street: {
                relation: Model.HasManyRelation,
                modelClass: DistrictStreet,
                join: {
                    from: 'street.id',
                    to: 'district_street.street'
                }
            }
        }
    }
}

module.exports = Street