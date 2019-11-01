This is online shopping project, users can buy clothes and accessories.
In this project we are using passport,Body parser and express middleware,
Mongoose,pug.

without logining in user can select products and add them to the chart,
to buy selected products they need to login.

Schema structure sample: 

womens(root)/womens-clothing/womens-clothing-tops
mens(root)/mens-clothing/mens-clothing-tops
-categories:
_id:(unique field)
id:womens,
name:womens,
page_description:Women's range. Fashionable and stylish...,
page_title:Women's Footwear, Outerwear, Clothing & Accessories,
parent_category_id:root,
c_showInMenu:true,
categories:[{
	id:womens-clothing,
            name:clothing,
            image:,
            page_description:Shop Women's Clothing...,
            page_title:Womens Clothing Top,Bottom. ,
            parent_category_id:womens,
            c_showInMenu:true,
            categories:[
                {
                    id:,
                    name:,
                    image:,
                    page_description:,
                    page_title:,
                    parent_category_id:,
                    c_showInMenu:}
        ]}
    ]

-product:
_id:(unique field)
id: 3246533,
name:navy single wool suit,
page_description:this suit is awesome,
page_title:Navy single wool suit,
primary_category_id:mens-clothing-suits,
price:299,
currency:USD,
master:{orderable:true,
        price:299,
        master_id:23342
        },
orderable:true,
type:{ master:true },
short_description:This suit is greate for any occasions,
long_description:This suit is...,
image_groups:[
        {images:[
                {
                    alt:Navy single,navy,medium,
                    link:...,
                    title:navy single wool..,navy
                }
            ],
            variation_value:NAVYWL,
            view_type:medium,
        }
    ],
    variation_attributes:[
        {
            values:[
                {
                    orderable:true,
                    name:Navy,
                    value:{NavyWL
                }
            ],
            id:color,
            name:color

        }
    ],
    variants:[
        {
            variation_values:{
                color:NAVYWL,
                size:050		
            },
            price:299,
            product_id:2342342,
            orderable:true
        }
    ]



