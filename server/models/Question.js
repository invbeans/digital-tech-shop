const { Model } = require('objection');

class Question extends Model {
    static get tableName() {
        return 'question'
    }

    static get relationMappings() {
        const User = require('./User')
        const Product = require('./Product')
        const Answer = require('./Answer')

        return {
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'question.user',
                    to: 'user.id'
                }
            },
            product_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'question.product',
                    to: 'product.id'
                }
            },
            answer_rel: {
                relation: Model.HasManyRelation,
                modelClass: Answer,
                join: {
                    from: 'question.id',
                    to: 'answer.question'
                }
            }
        }
    }
}

module.exports = Question