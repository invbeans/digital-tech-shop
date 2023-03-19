const { Model } = require('objection');

class Answer extends Model {
    static get tableName() {
        return 'answer'
    }

    static get relationMappings() {

    }
}

module.exports = Answer