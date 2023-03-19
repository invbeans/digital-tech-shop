const { Model } = require('objection');

class SubCategory extends Model {
    static get tableName() {
        return 'sub_category'
    }

    static get relationMappings() {

    }
}

module.exports = SubCategory