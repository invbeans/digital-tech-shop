const { Model } = require('objection');

class City extends Model {
    static get tableName() {
        return 'city'
    }

    static get relationMappings() {
        const Region = require('./Region')
        const DistrictCity = require('./DistrictCity')

        return {
            region_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Region,
                join: {
                    from: 'city.region',
                    to: 'region.id'
                }
            },
            district_city_rel: {
                relation: Model.HasManyRelation,
                modelClass: DistrictCity,
                join: {
                    from: 'city.id',
                    to: 'district_city.city'
                }
            }
        }
    }
}

module.exports = City