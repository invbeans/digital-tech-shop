const { Model } = require('objection');

class Region extends Model {
    static get tableName() {
        return 'region'
    }

    static get relationMappings() {
        const Adress = require('./Adress')
        const City = require('./City')

        return {
            adress: {
                relation: Model.HasManyRelation,
                modelClass: Adress,
                join: {
                    from: 'region.id',
                    to: 'adress.region'
                }
            },
            city: {
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