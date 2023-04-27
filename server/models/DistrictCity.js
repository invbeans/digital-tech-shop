const { Model } = require('objection');
const DistrictStreet = require('./DistrictStreet');

class DistrictCity extends Model {
    static get tableName() {
        return 'district_city'
    }

    static get relationMappings() {
        const District = require('./District')
        const City = require('./City')

        return {
            city_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: City,
                join: {
                    from: 'district_city.city',
                    to: 'city.id'
                }
            },
            district_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: District,
                join: {
                    from: 'district_city.district',
                    to: 'district.id'
                }
            },
            district_street_rel: {
                relation: Model.HasOneRelation,
                modelClass: DistrictStreet,
                join: {
                    from: 'district_city.id',
                    to: 'district_street.district_city'
                }
            }
        }
    }
}

module.exports = DistrictCity