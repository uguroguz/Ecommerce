const express = require('express');
const router = express.Router();


//Bring in product Model
let Product = require('../models/product');

var basket = [];

router.get('/', function(req, res){
    var basketProduct = basket.map(function(e){return e.product});
    Product.find({_id:{$in: basketProduct}}, function(err, orders){
        if(err){
            console.log(err);
        }
        else{                   
            var basket_display = [];            
            var totalPrice = 0;
            var amount;
            for(var i= 0; i < orders.length; i++){

                for(var k= 0; k <basket.length; k++){
                    if(orders[i]._id == basket[k].product){
                        amount = basket[k].amount;
                        break;
                    }

                }

                for(var j= 0; j < orders[i].image_groups.length ; j++){
                    if(orders[i].image_groups[j].view_type == 'small'){
                        
                        var product = {
                            _id: orders[i]._id,
                            name: orders[i].name,
                            amount: amount,
                            price: orders[i].price * amount,
                            image: orders[i].image_groups[j].images[0].link
                        };
                        totalPrice += product.price;
                        
                        basket_display.push(product);                        
                        break;                            
                    }

                }
                
            } 
            console.log(basket);               
            res.render('chart',{
                title:'Shopping Basket',
                products:basket_display,
                totalPrice: totalPrice
            });
        }
    });         
});

router.post('/add', function(req, res){
   
    if(basket.length == 0){
        basket.push(req.body);
    }
    else{

        for(var i = 0; i < basket.length; i++){
            if(basket[i].product == req.body.product){
                basket[i].amount = Number(basket[i].amount) + Number(req.body.amount);
                break;
            }
            else if(i == basket.length-1){
                basket.push(req.body);
                break;
            }
        }

    }
   
    req.flash('success', 'Added to chart');
    //sending empty so ajax success will reload page
    res.send();
});

router.post('/buy',ensureAuthenticated, function(req, res){
    if(basket.length == 0){
        req.flash('error','can not proceed with empty basket');
        res.redirect(req.get('referer'));
    }
    else{
        
        console.log(req.user.id);
        console.log(basket);

        let newOrder = new Order({
            userI: req.user.id,
            orders:[
                {
                    basket:basket,
                    date:Date.now()                
                }
            ]
                  
        });
        newOrder.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            else{
                basket = [];    
                req.flash('success','Order request success');
                return res.redirect(req.get('referer'));                
                
            }
        });
    }
    
    
});

router.get('/remove/:id', function(req, res){

    basket = basket.filter(function(e){
        return e.product !== req.params.id;
    });
    res.redirect('/chart');
});

//Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('danger','please login to buy products');
        res.redirect('/user/login');
    }
}

module.exports = router;