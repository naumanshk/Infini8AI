var shoppingCart_schema = require('../models/shoppingCart_model')

var shoppingCart_controller = {

    add_shoppingCart: (req, res) => {

        var shoppingCart = new shoppingCart_schema(req.body);
        console.log(req.body);
        shoppingCart.save((err) => {
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

    update_shoppingCart: (req, res, next) => {

        shoppingCart_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("shoppingCart does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_shoppingCart: (req, res, next) => {
console.log(req.params)
        shoppingCart_schema.deleteMany({"userID":req.params.id},(err,doc)=>{

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

    delete_shoppingCartItem: (req, res, next) => {
        console.log(req.params)
        shoppingCart_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

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

    view_shoppingCart: (req, res) => {

        shoppingCart_schema.find({ 'userID': req.params.name }).populate('products').exec(function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No shoppingCart exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    view_all_shoppingCart: (req, res, next) => {

        shoppingCart_schema.find({}).populate('products').exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });

    
    },
    viewQty: (req, res, next) => {

        shoppingCart_schema
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

        shoppingCart_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("shoppingCart does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("shoppingCart exist");
                            }

        });

    }

    

}

module.exports = shoppingCart_controller