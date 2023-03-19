const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'user'
  }

  static get relationMappings() {
    const MetaUser = require('./MetaUser')
    return {
        meta_user: {
            relation: Model.HasOneRelation,
            modelClass: MetaUser,
            join: {
                from: 'user.id',
                to: 'meta_user.user'
            }
        }
    }
}
}

module.exports = User