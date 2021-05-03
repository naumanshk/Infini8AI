var product_schema = require('../models/product_model')
var session = require('express-session');
var GeoPoint = require('geopoint');
var product_controller = {

    add_product: (req, res) => {
        console.log(req.body);
        var product = new product_schema(req.body.data);

        product.save((err,data) => {
            if (err) {
                       res.status(500)
                       res.send("Failed to add"+err);
                     }

            else     {
                       res.status(200);
                       res.json(data);
                     }

        });

    },

    update_product: (req, res, next) => {
        console.log(req.body)
        product_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("product does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    
    delete_store: (req, res, next) => {
        console.log(req.params)
                product_schema.deleteMany({"stores":req.params.id},(err,doc)=>{
        
                    if(err)    {
                                res.status(500);
                                res.end("Failed to Delete");
                               } 
        
                    if (!doc)  {
                                res.status(404);
                                res.end("shoppingCart does not exist");
                               } 
        
                    else       {
                                res.status(200);
                                res.end("Successfully deleted");
                               }
        
                })
        
            },
        
      

        
    delete_product: (req, res, next) => {

        product_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("product does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    view_productbyCategory: (req, res) => {

        console.log(req.params.id)
        product_schema.find({ 'category': req.params.id.toString() }).populate('stores')
        .exec(function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No product exist"); 
                      }

            else      {
                        session.ProductName=doc.name;
                        console.log(session.ProductName)

                       res.status(200); 
                       res.json(doc);

                      }
        });


    },

    search: (req, res) => {

        
        product_schema.find({ 
             $or : [ 
                { $text: { $search: req.params.name} },
               
            ]
            
         })
        .exec(function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No product exist"); 
                      }

            else      {
                     

                       res.status(200); 
                       res.json(doc);

                      }
        });


    },

    

    view_product: (req, res) => {

        product_schema.findOne({ '_id': req.params.id }).populate('stores')
        .exec(function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No product exist"); 
                      }

            else      {
                        session.ProductName=doc.name;
                        console.log(session.ProductName)

                       res.status(200); 
                       res.json(doc);

                      }
        });


    },

    updateQty: (req, res, next) => {
        var id=req.params.id
        var qty=req.body.qty
        console.log(qty)
        console.log(id)
        product_schema.update({_id:id}, {$inc: {quantity: -qty}}, function (err, product)  {
        
            if (err) {
                res.json(err);
            }

           
            // Respond with valid data
            res.json(product);
        });

    
    },
    getLocation: (req, res, next) => {
        
        var id=req.params.id
        product_schema
        
        .find({'stores':id})
        .exec(function(error, results) {
            if (error) {
                return next(error);
            }
           
            // for(i=0; i<2;i++){
                // point1 = new GeoPoint(results[0].stores.lat, results[0].stores.lng);
                // point2 = new GeoPoint(33.7181584 , 73.071358);
                // var distance = point2.distanceTo(point1, true)
                
                // console.log(distance+"KM")
            // }
       
           
            // Respond with valid data
            res.json(results);
        });
    },

    getProsCat: (req, res, next) => {
        console.log(req.query.id)
        var id=req.params.id
        product_schema
        
        .find({'stores':req.query.id,'category':req.query.category})
        .exec(function(error, results) {
            if (error) {
                return next(error);
            }
           
            // for(i=0; i<2;i++){
                // point1 = new GeoPoint(results[0].stores.lat, results[0].stores.lng);
                // point2 = new GeoPoint(33.7181584 , 73.071358);
                // var distance = point2.distanceTo(point1, true)
                
                // console.log(distance+"KM")
            // }
       
           
            // Respond with valid data
            res.json(results);
        });
    },

    view_all_product: (req, res, next) => {
        product_schema.find({}).populate('stores').exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });



        // let sort_by = req.query.sort_by;
        // if( sort_by== undefined) sort_by ='full_name';

        // product_schema.find({}, (err, doc) => {

        //     if (err)   {
        //                 res.status(500);
        //                 res.end("Failed to get products");
        //                } 
           
        //     if (!doc)  {
        //                 res.status(404);
        //                 res.end("No product exist");
        //                }
           
        //     else       {
        //         console.log(session.storeID);
        //                 res.status(200);
        //                 res.json(doc);
        //                }

        // }).sort(sort_by)
    
    },

    inventory: (req, res, next) => {
        console.log("productName"+session.ProductName)
        console.log("StoreID"+session.StoreID)
        product_schema.find({
            "name":session.ProductName,
            "stores":session.StoreID

            // $and : [ 
            //     { $text: { $search: session.ProductName} },
            //     {"stores": session.StoreID}
            // ]
        }).exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });
    },
    outOfStock: (req, res, next) => {
        console.log(session.StoreID)
        product_schema.find({
            stores:session.StoreID,
            quantity:{$lt:15}

        }).exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });
    },

    view_storeProducts: (req, res) => {

        product_schema.find({ 'stores': req.params.id })
       
        .exec(function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No store exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    login: (req, res, next) => {

        product_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("product does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("product exist");
                            }

        });

    }

    

}

module.exports = product_controller