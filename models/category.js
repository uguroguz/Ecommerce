let mongoose = require('mongoose');

//Category Schema

let categorySchema = mongoose.Schema({
    id:{ type: String },
    name:{ type: String },
    page_description:{ type: String},
    page_title:{ type: String},
    parent_category_id:{ type: String},
    c_showInMenu:{ type: Boolean},
    categories:[
        {
            id:{ type: String},
            name:{ type: String},
            image:{ type: String},
            page_description:{ type: String},
            page_title:{ type: String},
            parent_category_id:{ type: String},
            c_showInMenu:{ type: Boolean},
            categories:[
                {
                    id:{ type: String},
                    name:{ type: String},
                    image:{ type: String},
                    page_description:{ type: String},
                    page_title:{ type: String},
                    parent_category_id:{ type: String},
                    c_showInMenu:{ type: Boolean}}
        ]}
    ]
});

let Category = module.exports = mongoose.model('Category',categorySchema);