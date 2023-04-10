const { Model, ValidationError } = require('objection');

class Product extends Model {
    static get tableName() {
        return 'product'
    }

    $beforeInsert() {
        if(this.price <= 0){
            throw new ValidationError({
                message: 'Неккоректная цена товара'
            })
        }
        if(this.rating < 0){
            throw new ValidationError({
                message: 'Неккоректный рейтинг товара'
            })
        }
    }

    static get jsonSchema() {
        return{
            type: 'object',
            properties: {
                price: {type: 'number'}, //везде где дабл расставить намбер
                rating: {type: 'number'}
            }
        }
    }

    static get relationMappings() {
        const ProductPropertyValues = require('./ProductPropertyValues')
        const ProductRemains = require('./ProductRemains')
        const Review = require('./Review')
        const ReturnProduct = require('./ReturnProduct')
        const ProductImage = require('./ProductImage')
        const Question = require('./Question')
        const DoubleAction = require('./DoubleAction')
        const BasketProduct = require('./BasketProduct')
        const OrderProduct = require('./OrderProduct')
        const SubCategory = require('./SubCategory')
        const Manufacturer = require('./Manufacturer')
        const Supplier = require('./Supplier')

        return {
            product_property_values_rel: {
                relation: Model.HasManyRelation,
                modelClass: ProductPropertyValues,
                join: {
                    from: 'product.id',
                    to: 'product_property_values.product'
                }
            },
            product_remains_rel: {
                relation: Model.HasOneRelation,
                modelClass: ProductRemains,
                join: {
                    from: 'product.id',
                    to: 'product_remains.product'
                }
            },
            review_rel: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: 'product.id',
                    to: 'review.product'
                }
            },
            return_product_rel: {
                relation: Model.HasManyRelation,
                modelClass: ReturnProduct,
                join: {
                    from: 'product.id',
                    to: 'return_product.product'
                }
            },
            product_image_rel: {
                relation: Model.HasManyRelation,
                modelClass: ProductImage,
                join: {
                    from: 'product.id',
                    to: 'product_image.product'
                }
            },
            question_rel: {
                relation: Model.HasManyRelation,
                modelClass: Question,
                join: {
                    from: 'product.id',
                    to: 'question.product'
                }
            },
            full_price_product_rel: {
                relation: Model.HasManyRelation,
                modelClass: DoubleAction,
                join: {
                    from: 'product.id',
                    to: 'double_action.full_price_product'
                }
            },
            discount_product_rel: {
                relation: Model.HasManyRelation,
                modelClass: DoubleAction,
                join: {
                    from: 'product.id',
                    to: 'double_action.discount_product'
                }
            },
            basket_product_rel: {
                relation: Model.HasManyRelation,
                modelClass: BasketProduct,
                join: {
                    from: 'product.id',
                    to: 'basket_product.product'
                }
            },
            order_product_rel: {
                relation: Model.HasManyRelation,
                modelClass: OrderProduct,
                join: {
                    from: 'product.id',
                    to: 'order_product.product'
                }
            },
            sub_category_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: SubCategory,
                join: {
                    from: 'product.sub_category',
                    to: 'sub_category.id'
                }
            },
            manufacturer_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Manufacturer,
                join: {
                    from: 'product.manufacturer',
                    to: 'manufacturer.id'
                }
            },
            supplier_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Supplier,
                join: {
                    from: 'product.supplier',
                    to: 'supplier.id'
                }
            }
        }
    }
}

module.exports = Product