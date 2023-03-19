const { Model } = require('objection');

class PropertySubCategory extends Model {
    static get tableName() {
        return 'property_sub_category'
    }

    static get relationMappings() {

    }
}

module.exports = PropertySubCategory