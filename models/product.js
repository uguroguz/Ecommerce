let mongoose = require('mongoose');

//Product Schema

let productSchema = mongoose.Schema({
    id:{ type: String },
    name:{ type: String },
    page_description:{ type: String },
    page_title:{ type: String },
    primary_category_id:{ type: String },
    price:{ type: Number },
    currency:{ type: String },
    master:{orderable:{ type: Boolean},
            price:{ type: Number },
            master_id:{ type: String}
            },
    orderable:{ type: Boolean },
    type:{ master:{ type: Boolean } },
    short_description:{ type: String },
    long_description:{ type: String },
    image_groups:[
        {
            images:[
                {
                    alt:{ type: String },
                    link:{ type: String },
                    title:{ type: String }
                }
            ],
            variation_value:{ type: String },
            view_type:{ type: String },
        }
    ],
    variation_attributes:[
        {
            values:[
                {
                    orderable:{ type: Boolean },
                    name:{ type: String},
                    value:{ type: String}
                }
            ],
            id:{ type: String },
            name:{ type: String }

        }
    ],
    variants:[
        {
            variation_values:{
                color:{ type: String },
                size:{ type: String }
            },
            price:{ type: Number},
            product_id:{ type: String },
            orderable:{ type: Boolean}
        }
    ]

});

let Product = module.exports = mongoose.model('Product', productSchema);