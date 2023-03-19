const { Model } = require('objection');

class BrandAction extends Model {
    static get tableName() {
        return 'brand_action'
    }

    static get relationMappings() {

    }
}

module.exports = BrandAction