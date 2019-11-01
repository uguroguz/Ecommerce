const express = require('express');
const router = express.Router();

//Bring Category Model
let Category = require('../models/category');

//Add route
router.get('/', function(req, res){
    res.render('category',{
        title:'category'
    });    
});

router.get('/:id', function(req, res){
    Category.aggregate(
        {$unwind:'$categories'},
        {$match:{'categories.parent_category_id': req.params.id}},
        {$project:{id:'$categories.id', name:'$categories.name', parent_category_id:'$categories.parent_category_id', page_title:'$page_title', page_description:'$categories.page_description', image:'$categories.image'}},
        function(err,categories){
        if(err){
            console.log(err);
        }
        else{
                     
            res.render('category',{
                title:categories[0].page_title,
                categories:categories
            });
        }
    });
    
});

router.get('/:parent/:id', function(req,res){
    
    Category.aggregate(
        {$unwind:'$categories'},        
        {$unwind:{path:'$categories.categories'}},
        {$match:{'categories.categories.parent_category_id':req.params.id}},
        {$project:{id:'$categories.categories.id', name:'$categories.categories.name', parent_category_id:'$categories.categories.parent_category_id',page_title:'$categories.page_title', page_description:'$categories.categories.page_description', image:'$categories.categories.image'}},
        function(err,categories){
            if(err){
                console.log(err);
            }
            else{                
                res.render('category_type',{
                    title:categories[0].page_title,                    
                    categories:categories
                });
            }
        }
    );
   
});


module.exports = router;