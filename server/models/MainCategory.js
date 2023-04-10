const { Model } = require('objection');

class MainCategory extends Model {
    static get tableName() {
        return 'main_category'
    }

    static get relationMappings() {
        const SubCategory = require('./SubCategory')

        return {
            sub_category_rel: {
                relation: Model.HasManyRelation,
                modelClass: SubCategory,
                join: {
                    from: 'main_category.id',
                    to: 'sub_category.main_category'
                }
            }
        }
    }
}

module.exports = MainCategory