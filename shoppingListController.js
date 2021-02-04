const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const ShoppingList = require('./shoppingList');
const Item = require('./items/Item');

router.post('/', function (req, res) {
    Item.find({}, function (err, items) {
        if (err) return res.status(500).send("There was a problem finding the Item from the database.");
        req.body.items.forEach(item => {
            const idx = items.findIndex(obj => obj.name == item);
            if(idx == -1){
                res.status(200).send({msg: "There is an item which not exist in Item list"});
                return;
            }
        });
        ShoppingList.create({
            name: req.body.name,
            items: req.body.items
        }, 
        function (err, shoppingList) {
            if (err) return res.status(500).send("There was a problem adding the ShoppingList to the database.");
            res.status(200).send(shoppingList);
        });    
    });
});

router.get('/', function (req, res) {
    ShoppingList.find({}, function (err, shoppingList) {
        if (err) return res.status(500).send("There was a problem finding the ShoppingList.");
        res.status(200).send(shoppingList);
    });
});

router.put('/', function(req, res){
    ShoppingList.updateOne(
        {_id: req.body._id},
        {name: req.body.name, items: req.body.items},
        function(err, res){
            if (err) return res.status(500).send("There was a problem updating the ShoppingList.");
            res.status(200).send("Update Success");
        }
    )
})

router.delete('/', function(req, res){
    ShoppingList.deleteOne(
        {_id: req.body._id},
        function(err, shoppingList){
            if (err) return res.status(500).send("There was a problem deleting the ShoppingList.");
            res.status(200).send(shoppingList);
        }
    )
})

module.exports = router;