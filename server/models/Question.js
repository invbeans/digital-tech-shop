const { Model } = require('objection');

class Question extends Model {
    static get tableName() {
        return 'question'
    }

    static get relationMappings() {

    }
}

module.exports = Question