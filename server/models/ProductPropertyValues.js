const { Model } = require('objection');

class ProductPropertyValue extends Model {
    static get tableName() {
        return 'product_property_value'
    }

    static get relationMappings() {

    }
}

module.exports = ProductPropertyValue