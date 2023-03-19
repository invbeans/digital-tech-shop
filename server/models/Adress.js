const { Model } = require('objection');

class Adress extends Model {
    static get tableName() {
        return 'adress'
    }

    static get relationMappings() {
        const Region = require('./Region')
        const StreetType = require('./StreetType')
        return {
            region: {
                relation: Model.BelongsToOneRelation,
                modelClass: Region,
                join: {
                    from: 'adress.region',
                    to: 'region.id'
                }
            },
            street_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: StreetType,
                join: {
                    from: 'adress.street_type',
                    to: 'street_type.id'
                }
            }
        }
    }
}

module.exports = Adress