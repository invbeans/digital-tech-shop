const {Model} = require('objection')

class Role extends Model {
    static get tableName(){
        return 'role'
    }

    static get jsonSchema() {
        return{
            type: 'object',
            properties: {
                name: {type: 'string', minLength: 4, maxLength: 10}
            }
        }
    }

    static get relationMappings() {
        const MetaUser = require('./MetaUser')
        return {
            meta_user: {
                relation: Model.HasManyRelation,
                modelClass: MetaUser,
                join: {
                    from: 'role.id',
                    to: 'meta_user.role'
                }
            }
        }
    }
}
module.exports = Role