var request_schema = require('../models/request_model')

var request_controller = {

    add_request: (req, res) => {

        var request = new request_schema(req.body);

        request.save((err) => {
            if (err) {
                       res.status(500)
                       res.send("Failed to add");
                     }

            else     {
                       res.status(200);
                       res.end("Successfully added");
                     }

        });

    },

    update_request: (req, res, next) => {

        request_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("request does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_request: (req, res, next) => {

        request_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("request does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    view_request: (req, res) => {

        request_schema.findOne({ 'name': req.params.name }, function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No request exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    view_all_request: (req, res, next) => {
        request_schema.find({}).populate('stores').populate('retailer').exec(function(error, results) {
            if (error) {
                return next(error);
            }

           
            // Respond with valid data
            res.json(results);
        });


       
},
    

    login: (req, res, next) => {

        request_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("request does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("request exist");
                            }

        });

    }

    

}

module.exports = request_controller