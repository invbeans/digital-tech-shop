const { Model } = require('objection');

class DistrictStreet extends Model {
    static get tableName() {
        return 'district_street'
    }

    static get relationMappings() {
        const DistrictCity = require('./DistrictCity')
        const Street = require('./Street')

        return {
            district_city: {
                relation: Model.BelongsToOneRelation,
                modelClass: DistrictCity,
                join: {
                    from: 'district_street.district_city',
                    to: 'district_city.id'
                }
            },
            street: {
                relation: Model.BelongsToOneRelation,
                modelClass: Street,
                join: {
                    from: 'district_street.street',
                    to: 'street.id'
                }
            }
        }
    }
}

module.exports = DistrictStreet