const { Model } = require('objection');

class UserActivity extends Model {
    static get tableName() {
        return 'user_activity'
    }

    static get relationMappings() {

    }
}

module.exports = UserActivity