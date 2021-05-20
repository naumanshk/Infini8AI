var consumer_schema = require('../models/consumer_model')

var consumer_controller = {

    add_consumer: (req, res) => {

        var consumer = new consumer_schema(req.body);

        consumer.save((err) => {
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

    update_consumer: (req, res, next) => {

        console.log(req.params.id)
        consumer_schema.findByIdAndUpdate(req.params.id,req.body,(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update"+err);
                           }

                if (!todo) {
                            res.status(404)
                            res.end("consumer does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_consumer: (req, res, next) => {

        consumer_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("consumer does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    view_consumer: (req, res) => {
        console.log("params"+req.params.name)

        consumer_schema.findOne({ 'name': req.params.name }, function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No consumer exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    view_all_consumer: (req, res, next) => {

        let sort_by = req.query.sort_by;
        if( sort_by== undefined) sort_by ='full_name';

        consumer_schema.find({}, (err, doc) => {

            if (err)   {
                        res.status(500);
                        res.end("Failed to get consumers");
                       } 
           
            if (!doc)  {
                        res.status(404);
                        res.end("No consumer exist");
                       }
           
            else       {
                        res.status(200);
                        res.json(doc);
                       }

        }).sort(sort_by)
    
    },

    login: (req, res, next) => {

        consumer_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.end("");
                          }

            if (!result)  {
                              res.status(404);
                              res.send("consumer does not exist");
                          }

            else            {
                              res.status(200);
                              res.send("consumer exist");
                            }

        });

    }

    

}

module.exports = consumer_controller