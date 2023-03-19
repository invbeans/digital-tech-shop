const { Model } = require('objection');

class District extends Model {
    static get tableName() {
        return 'district'
    }

    static get relationMappings() {
        const DistrictCity = require('./DistrictCity')

        return {
            district_city: {
                relation: Model.HasManyRelation,
                modelClass: DistrictCity,
                join: {
                    from: 'district.id',
                    to: 'district_city.district'
                }
            }
        }
    }
}

module.exports = District