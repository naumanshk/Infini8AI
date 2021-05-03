var quickBuy_schema = require('../models/quickBuy_model')

var quickBuy_controller = {

    add_quickBuy: (req, res) => {

        var quickBuy = new quickBuy_schema(req.body);
        console.log(req.body);
        quickBuy.save((err) => {
            if (err) {
                       res.status(500)
                       res.json("Failed to add"+err);
                     }

            else     {
                       res.status(200);
                       res.end("Successfully added");
                     }

        });

    },

    update_quickBuy: (req, res, next) => {

        quickBuy_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("quickBuy does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_quickBuy: (req, res, next) => {
console.log(req.params)
        quickBuy_schema.deleteMany({"userID":req.params.id},(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("quickBuy does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    delete_quickBuyItem: (req, res, next) => {
        console.log(req.params)
        quickBuy_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

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

    view_quickBuy: (req, res) => {

        console.log("query"+req.query.schedule.toLowerCase())

        quickBuy_schema.find({ 'userID': req.query.id.toString(),'schedule': req.query.schedule.toLowerCase()
    
    }).populate('products').exec(function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No quickBuy exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    view_all_quickBuy: (req, res, next) => {
        console.log("query"+req.query.id)
        quickBuy_schema.find({}).populate('products').exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });

    
    },
    viewQty: (req, res, next) => {

        quickBuy_schema
        .aggregate([
            {$group:{_id:"$products",total:{$sum:"$quantity"}}}
        ])
        .exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });

    
    },

    


    login: (req, res, next) => {

        quickBuy_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("quickBuy does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("quickBuy exist");
                            }

        });

    }

    

}

module.exports = quickBuy_controller