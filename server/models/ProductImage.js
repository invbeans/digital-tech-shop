const { Model } = require('objection');

class ProductImage extends Model {
    static get tableName() {
        return 'product_image'
    }

    static get relationMappings() {

    }
}

module.exports = ProductImage