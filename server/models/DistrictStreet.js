const { Model } = require('objection');

class DistrictStreet extends Model {
    static get tableName() {
        return 'district_street'
    }

    static get relationMappings() {
        const DistrictCity = require('./DistrictCity')
        const Street = require('./Street')

        return {
            district_city_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: DistrictCity,
                join: {
                    from: 'district_street.district_city',
                    to: 'district_city.id'
                }
            },
            street_rel: {
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