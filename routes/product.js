const express = require('express');
const router = express.Router();

//Bring in Model
let Product = require('../models/product');

router.get('/', function(req, res){
    res.render('product',{
        title:'product'
    });    
});

router.get('/:id', function(req, res){
    Product.aggregate(        
        { $unwind:'$image_groups'},
        { $unwind: '$image_groups.images'},
        { $match:{primary_category_id:req.params.id, 'image_groups.view_type':'medium'}}, 
        { $group : { _id : "$_id", name:{$first:'$name'}, price:{$first:'$price'}, short_description:{$first:'$short_description'}, primary_category_id:{$first:'$primary_category_id'}, image:{$first:'$image_groups.images.link'} }},       
        
        function(err,products){
            if(err){
                console.log(err);
            }
            else{
                
                res.render('product',{
                    title:'product',
                    products:products
                });
            }
        }
    );
   
});

router.get('/detail/:name', function(req, res){

    Product.aggregate(
        {$unwind:'$image_groups'},
        {$unwind:'$image_groups.images'},
        {$match:{name:req.params.name}},
        {$project:{name:'$name', price:'$price' , currency:'$currency' , long_description:'$long_description', short_description:'$short_description', image:'$image_groups.images.link', size:'$image_groups.view_type'}},
        function(err, products){
            if(err){

            }
            else{
                
                var smallimages = [];
                var largeimage;
                var smallAmount = 3;
                var largeAmount = 1;
                for(var i = 0; i < products.length;i++){
                    if(products[i].size == 'large' && largeAmount > 0){
                        largeimage = products[i];
                        largeAmount--;
                    }
                    else if(products[i].size =='small' && smallAmount > 0){
                        smallimages.push(products[i].image);
                        smallAmount--;
                    }                    
                }    
                          
                res.render('product_detail', {
                    
                    title:'Details',
                    product:largeimage,
                    images:smallimages
                });
            }
        }
    );

   
});


module.exports = router;