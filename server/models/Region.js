const { Model } = require('objection');

class Region extends Model {
    static get tableName() {
        return 'region'
    }

    static get relationMappings() {
        const City = require('./City')

        return {
            city_rel: {
                relation: Model.HasManyRelation,
                modelClass: City,
                join: {
                    from: 'region.id',
                    to: 'city.region'
                }
            }
        }
    }
}

module.exports = Region