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
    lPLU: {type: Number, require: true, unique: true}
});

itemsSchema.methods.getItems = function(number, sortField, offset, callback){
    Items.find()
        .sort(sortField)
        .limit(number)
        .skip(offset)
        .exec(function(err, items){
            if(!err){
                Items.count({}, function (err, count) {
                    console.log(count);
                    callback(err, count, items);
                });
            }
            else{
                callback(err, null)
            }
        });
};

itemsSchema.methods.getItemsByTitle = function(number, sortField, offset, query, queryField, callback){
    Items.find({"lBoldTitle": {$regex: new RegExp(query, "i")}})
        .sort(sortField)
        .limit(number)
        .skip(offset)
        .exec(function(err, items){
            if(!err){
                Items.count({"lBoldTitle": {$regex: new RegExp(query, "i")}}, function (err, count) {
                    console.log(count);
                    callback(err, count, items);
                });
            }
            else{
                callback(err, null)
            }
        });
};

itemsSchema.methods.addItem = function(item, callback){
    item.save(function(err, item){
        callback(err, item)
    });
};

itemsSchema.methods.deleteItems = function(itemIDs, callback){
    Items.deleteMany({_id: {$in: itemIDs}}, function(err){
        callback(err);
    })
};

var Items = mongoose.model('Items', itemsSchema);

module.exports  = Items;



