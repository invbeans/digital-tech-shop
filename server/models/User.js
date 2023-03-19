const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'user'
  }

  static get relationMappings() {
    const MetaUser = require('./MetaUser')
    const UserProfile = require('./UserProfile')
    const Question = require('./Question')
    const Basket = require('./Basket')
    const Order = require('./Order')
    const UserActivity = require('./UserActivity')
    const Answer = require('./Answer')
    const Review = require('./Review')

    return {
      meta_user: {
        relation: Model.HasOneRelation,
        modelClass: MetaUser,
        join: {
          from: 'user.id',
          to: 'meta_user.user'
        }
      },
      user_profile: {
        relation: Model.HasOneRelation,
        modelClass: UserProfile,
        join: {
          from: 'user.id',
          to: 'user_profile.user'
        }
      },
      question: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: 'user.id',
          to: 'question.user'
        }
      },
      basket: {
        relation: Model.HasOneRelation,
        modelClass: Basket,
        join: {
          from: 'user.id',
          to: 'basket.user'
        }
      },
      order: {
        relation: Model.HasManyRelation,
        modelClass: Order,
        join: {
          from: 'user.id',
          to: 'order.user'
        }
      },
      user_activity: {
        relation: Model.HasOneRelation,
        modelClass: UserActivity,
        join: {
          from: 'user.id',
          to: 'user_activity.user'
        }
      },
      answer: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: 'user.id',
          to: 'answer.user'
        }
      },
      review: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'user.id',
          to: 'review.user'
        }
      }
    }
  }
}

module.exports = User