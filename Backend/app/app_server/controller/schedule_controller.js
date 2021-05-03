var schedule_schema = require('../models/schedule_model')
var mongoose = require('mongoose');

var schedule_controller = {

    add_schedule: (req, res) => {

        var schedule = new schedule_schema(req.body);
        console.log(req.body);
        schedule.save((err) => {
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

    update_schedule: (req, res, next) => {

        schedule_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("schedule does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_schedule: (req, res, next) => {
console.log(req.params)
        schedule_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("schedule does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    delete_scheduleItem: (req, res, next) => {
        console.log(req.params)
        schedule_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

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

    view_schedule: (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id.toString());
        console.log("query"+req.query.schedule)

        schedule_schema.find({ 'userID': id
    
    }).exec(function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No schedule exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    view_all_schedule: (req, res, next) => {
        console.log("query"+req.query.id)
        schedule_schema.find({}).populate('products').exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });

    
    },
    viewQty: (req, res, next) => {

        schedule_schema
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

        schedule_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("schedule does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("schedule exist");
                            }

        });

    }

    

}

module.exports = schedule_controller