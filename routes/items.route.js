var express = require('express');
var router = express.Router();
var itemsController = require('../controllers/items.controller');

router.get('/get_items', function (req, res) {

    itemsController.getItemData(req.query, function(state, items){
        if(state.status){
            res.json(items);
        }else{
            res.status(500).send({error: state.message})
        }
    })
});

router.post('/add_item', function (req, res) {

});

module.exports = router;
