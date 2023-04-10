const { Model } = require('objection');

class Answer extends Model {
    static get tableName() {
        return 'answer'
    }

    static get relationMappings() {
        const User = require('./User')
        const Question = require('./Question')
        
        return {
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'answer.user',
                    to: 'user.id'
                }
            },
            question_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Question,
                join: {
                    from: 'answer.question',
                    to: 'question.id'
                }
            }
        }
    }
}

module.exports = Answer