const { Model } = require('objection');

class DoubleAction extends Model {
    static get tableName() {
        return 'double_action'
    }

    static get relationMappings() {

    }
}

module.exports = DoubleAction