const { Model } = require('objection');

class ReturnApplication extends Model {
    static get tableName() {
        return 'return_application'
    }

    static get relationMappings() {

    }
}

module.exports = ReturnApplication