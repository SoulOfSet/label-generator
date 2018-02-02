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
    itemsController.addItem(req.body, function(state, item){
        if(state.status){
            res.json(item);
        }else{
            console.log(item);
            res.status(500).send({error: state.message})
        }
    });
});

router.post('/delete_items', function (req, res) {
    itemsController.deleteItems(JSON.parse(req.body.items), function(state){
        if(state.status){
            res.json({status: "success"});
        }else{
            res.status(500).send({status: failed, error: state.message})
        }
    });

});

module.exports = router;
