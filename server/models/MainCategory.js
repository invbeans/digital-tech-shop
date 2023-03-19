const { Model } = require('objection');

class MainCategory extends Model {
    static get tableName() {
        return 'main_category'
    }

    static get relationMappings() {

    }
}

module.exports = MainCategory