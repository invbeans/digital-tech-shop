const { Model } = require('objection');

class SubCategoryAction extends Model {
    static get tableName() {
        return 'sub_category_action'
    }

    static get relationMappings() {

    }
}

module.exports = SubCategoryAction