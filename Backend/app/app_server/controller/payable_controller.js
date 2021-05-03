var payable_schema = require('../models/payable_model')
var session=require('express-session');
var payable_controller = {

    add_payable: (req, res) => {

        var payable = new payable_schema(req.body);

        payable.save((err) => {
            if (err) {
                       res.status(500)
                       res.send("Failed to add"+err);
                     }

            else     {
                       res.status(200);
                       res.end("Successfully added");
                     }

        });

    },

    update_payable: (req, res, next) => {

        payable_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("payable does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_payable: (req, res, next) => {

        payable_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("payable does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    view_payable: (req, res) => {

        payable_schema.find({ 'orderID': req.params.id }, function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No payable exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    view_all_payable: (req, res, next) => {

        let sort_by = req.query.sort_by;
        if( sort_by== undefined) sort_by ='full_name';

        payable_schema.find({storeID:session.StoreID.toString()}, (err, doc) => {

            if (err)   {
                        res.status(500);
                        res.end("Failed to get payables");
                       } 
           
            if (!doc)  {
                        res.status(404);
                        res.end("No payable exist");
                       }
           
            else       {
                        res.status(200);
                        res.json(doc);
                       }

        }).sort(sort_by)
    
    },

    login: (req, res, next) => {

        payable_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("payable does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("payable exist");
                            }

        });

    }

    

}

module.exports = payable_controller