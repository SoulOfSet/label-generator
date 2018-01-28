var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * This is the actual schema definition to map onto mongoose
 * @type {mongoose.Schema}
 */
var itemsSchema = new Schema({
    lBoldTitle: {type: String, require: true},
    lTitle: {type: String, require: false},
    lPrice: {type: Number, require: true},
    lIngredients: {type: String, require: false},
    lUsedBy: {type: Date, require: false},
    lPLU: {type: Number, require: true},
    lNumRequired: {type: Number, require: false}
});

itemsSchema.methods.getProducts = function(number, sortField, offset, callback){
    Items.find()
        .sort(sortField)
        .limit(number)
        .skip(offset)
        .exec(function(err, items){
            callback(err, items)
        });
};

var Items = mongoose.model('Items', itemsSchema);

module.exports  = Items;



