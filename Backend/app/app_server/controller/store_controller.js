var store_schema = require('../models/store_model')
const session= require('express-session');
const product = require('../models/product_model');
var store_controller = {

    add_store: (req, res) => {

        // var store = new store_schema(req.body);
                console.log(req.body)
                store_schema.create({
                    name : req.body.name,
                    number : req.body.number,
                    address : req.body.address,
                    
                    location : {

                     coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
                    }
                },function(err,hotel){
                    if(err){
                    console.log(err);
                    res
                    .status(400)
                    .json(err);
                    

                    }else{
                    console.log("The Store is added")
                    res
                    .status(200)
                    .json(hotel);

                    }

                });
        // store.save((err,data) => {
        //     if (err) {
        //                res.status(500)
        //                res.send("Failed to add"+err);
        //              }

        //     else     {
        //                res.status(200);
        //                res.json(data);
        //              }

        // });

    },
  

 
    getLocation: (req, res, next) => {
        
      
        // var point = { type : "Point", coordinates : [73.05526370000001, 33.5490411] };
        // store_schema.find(

        //     { location : { $near : [ 73.05526370000001, 33.5490411 ], $maxDistance: 10000 } }
        // )
        var point = {
            type : "Point",
            coordinates : [session.CustomerLng, session.CustomerLat]
          };
        
          var geoOptions = {
            spherical : true,
            maxDistance : 2000,
            num : 5
          };
        
          store_schema
          .aggregate(
            [{
              '$geoNear': {
                'near': point,
                'spherical': true,
                'distanceField': 'dist.calculated',
                'maxDistance': 5000
                 
              }
            }],function(err, results, stats) {
                
              console.log('Geo Results', results);
              console.log('Geo stats', stats);
              store_schema.populate(results, {path: "products.pid"} ,function(err,products){
                  console.log(products)
                  res
                  .status(200)
                  .json(products);
              }
              )
             
            });
            
        // geoNear(point, 
          
        //     function(err, results, stats) {
        //     res.status(200);
        //     res.json(results);
        // });
        
    },

    getCategory: (req, res, next) => {
        
      console.log('nauman')
        // var point = { type : "Point", coordinates : [73.05526370000001, 33.5490411] };
        // store_schema.find(

        //     { location : { $near : [ 73.05526370000001, 33.5490411 ], $maxDistance: 10000 } }
        // )
        var point = {
            type : "Point",
            coordinates : [73.05526370000001, 33.5490411]
          };
        
          var geoOptions = {
            spherical : true,
            maxDistance : 2000,
            num : 5
          };
        
          store_schema
          .aggregate(
            [{
              '$geoNear': {
                'near': point,
                'spherical': true,
                'distanceField': 'dist.calculated',
                'maxDistance': 5000,
                
              }
              
            }],function(err, results, stats) {
                var products=[]
                // products=results[0].products[1]
                
             products.push(results[0].products[1])
             products.push(results[2].products[0])
              console.log('Geo Results',products);
              console.log('Geo stats', stats);
            
              
             
            });
            
   
        
    },



    update_store: (req, res, next) => {
        console.log(req.body.up.products);

        store_schema.findByIdAndUpdate(req.params.id,
            {
                "$push": {
                    "products": {
                        "pid": req.body.up.products
                    }
                }
            },
            
            
            { new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update"+err);
                           }

                if (!todo) {
                            res.status(404)
                            res.end("store does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_store: (req, res, next) => {

        store_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("store does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    

    view_store: (req, res) => {

        store_schema.findOne({ '_id': req.params.name }).populate('products.pid')
        .select('products')
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
                       res.json(doc.products);
                      }
        });


    },

    view_all_store: (req, res, next) => {
        store_schema.find({}).populate('products.pid').exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });

        // let sort_by = req.query.sort_by;
        // if( sort_by== undefined) sort_by ='full_name';

        // store_schema.find({}, (err, doc) => {

        //     if (err)   {
        //                 res.status(500);
        //                 res.end("Failed to get stores");
        //                } 
           
        //     if (!doc)  {
        //                 res.status(404);
        //                 res.end("No store exist");
        //                }
           
        //     else       {
        //                 res.status(200);
        //                 res.json(doc);
        //                }

        // }).sort(sort_by)
    
    },

    login: (req, res, next) => {

        store_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("store does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("store exist");
                            }

        });

    }

    

}

module.exports = store_controller