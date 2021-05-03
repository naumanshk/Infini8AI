var retailer_schema = require('../models/retailer_model')
var session = require('express-session');
fs = require('fs'),
path = require('path'),
url = require('url');
imageDir = 'C:/FYP Code/Baazar-App/RetBaz/retailer/public/uploads';
var retailer_controller = {



    makeStripeUser: (req,res)=>{
        console.log(req.body)
        var stripe = require('stripe')('sk_test_HCShLCTnWQZR5ewTwaA9FihA00h40oO8oS');
    
            stripe.accounts.create(
            {
                type: 'custom',
                business_profile:{
                    name:req.body.storeName,
                    product_description:'we are here for you',
                    support_address:{
                        city:"New York",
                        country:"US",
                        line1:"123 State St",
                        postal_code:'12345',
                        state:"Schenectady"
                    },
                    support_url:"Punjab.com",
                    support_phone:"0000000000",
                    url:"Punjab.com",
                    mcc:'5411'
 
                },
                business_type: "individual",
                individual:{
                    
                    address:{
                        city:"Schenectady",
                        country:"US",
                        line1:"123 State St",
                        postal_code:'12345',
                        state:"New York"
                    },
                    dob:{
                        day:5,
                        month:1,
                        year:1996
                    },
                    email:"Punjab@gmail.com",
                    first_name:"Nauman",
                    gender:"male",
                    id_number:"000000000",
                    last_name:"Sheikh",
                    phone:"0000000000",
                    ssn_last_4:"0000",



                },
                tos_acceptance: {
                        date: Math.floor(Date.now() / 1000),
                        ip: "172.18.80.19", // Assumes you're not using a proxy
                        },
                    
                email: 'punjabiimart@gmail.com',
                requested_capabilities: [
                'card_payments',
                'transfers',
                ],
            },
            function(err, account) {
                if(err){
                    res.json(err)
                }
                res.json(account)
            }
            );
    
    }  ,

    delete_stripe: (req,res)=>{

    var stripe = require('stripe')('sk_test_HCShLCTnWQZR5ewTwaA9FihA00h40oO8oS');

    stripe.accounts.del(
    'acct_1GwBrnJHObYGfZbv',
    function(err, confirmation) {
        // asynchronously called
        res.json(confirmation)
        console.log(confirmation)
    }
    );
    },
    getImage:(req,res)=>{
        console.log('image')
        fs.readFile(imageDir+'/1.jpg', function (err, content) {
            if (err) {
                
                console.log(err);
                  
            } else {
                //specify the content type in the response will be an image
                res.end(content);
            }
        });
    },

    add_retailer: (req, res) => {

        var retailer = new retailer_schema(req.body);

        retailer.save((err,data) => {
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

    update_retailer: (req, res, next) => {

        console.log(req.body.retailerUpdate.stores)
        console.log(req.body)
        retailer_schema.findByIdAndUpdate(req.params.id,req.body.retailerUpdate,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("retailer does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_retailer: (req, res, next) => {

        retailer_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("retailer does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    view_retailer: (req, res) => {

        retailer_schema.findOne({ 'name': req.params.name }, function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No retailer exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    view_all_retailer: (req, res, next) => {
        retailer_schema.find({
            verified: {$ne: false}
        }).populate('stores')
        
        .exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            
            // console.log(session.storeID)
            res.json(results);
        });
    },
    notVerified: (req, res, next) => {
        retailer_schema.find({verified: {$ne: true}}).populate('stores')
        .exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            
            // console.log(session.storeID)
            res.json(results);
        });
    },
    verified: (req, res, next) => {

        console.log(req.body)
        console.log(req.body)
        retailer_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("retailer does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    //     let sort_by = req.query.sort_by;
    //     if( sort_by== undefined) sort_by ='full_name';

    //     retailer_schema.find({}, (err, doc) => {

    //         if (err)   {
    //                     res.status(500);
    //                     res.end("Failed to get retailers");
    //                    } 
           
    //         if (!doc)  {
    //                     res.status(404);
    //                     res.end("No retailer exist");
    //                    }
           
    //         else       {
    //                     res.status(200);
    //                     res.json(doc);
    //                    }

    //     }).sort(sort_by)
    
    // },

    login: (req, res, next) => {

        retailer_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("retailer does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("retailer exist");
                            }

        });

    }

    

}

module.exports = retailer_controller