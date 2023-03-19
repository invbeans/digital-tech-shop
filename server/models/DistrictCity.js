const { Model } = require('objection');

class DistrictCity extends Model {
    static get tableName() {
        return 'district_city'
    }

    static get relationMappings() {
        const District = require('./District')
        const City = require('./City')

        return {
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: City,
                join: {
                    from: 'district_city.city',
                    to: 'city.id'
                }
            },
            district: {
                relation: Model.BelongsToOneRelation,
                modelClass: District,
                join: {
                    from: 'district_city.district',
                    to: 'district.id'
                }
            }
        }
    }
}

module.exports = DistrictCity