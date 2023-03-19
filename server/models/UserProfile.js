const { Model } = require('objection');

class UserProfile extends Model {
    static get tableName() {
        return 'user_profile'
    }

    static get relationMappings() {

    }
}

module.exports = UserProfile