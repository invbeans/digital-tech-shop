const { Model } = require('objection');

class BrandAction extends Model {
    static get tableName() {
        return 'brand_action'
    }

    static get relationMappings() {
        const Action = require('./Action')
        const Manufacturer = require('./Manufacturer')

        return {
            action: {
                relation: Model.BelongsToOneRelation,
                modelClass: Action,
                join: {
                    from: 'brand_action.action',
                    to: 'action.id'
                }
            },
            manufacturer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Manufacturer,
                join: {
                    from: 'brand_action.manufacturer',
                    to: 'manufacturer.id'
                }
            }
        }
    }
}

module.exports = BrandAction