var tasks_schema = require('../models/tasks_model')
var mongoose = require('mongoose');

var tasks_controller = {

    test: (req, res) => {
        res.send("done")

    },

    add_tasksNotExist: (req, res,next) => {

        // tasks_schema.find({ name: req.body.name }, function (error, result) {
        //     if (error) {
        //         res.status(500)
        //         res.json("Failed to add" + error);
        //     }

        //     else {

        //         res.status(200);
        //         res.end("Successfully added");
        //     }
        // });

        tasks_schema.find({
            'name': req.params.id

        }).exec(function (err, doc) {

            if (err) {
                res.status("500");
                res.end("failed to view");
            }

            if (doc.length==0 ) {
                res.status(200);
                var tasks = new tasks_schema(req.body);
          
                tasks.save((err) => {
                    if (err) {
                        res.status(500)
                        res.end("Failed to add new data" + err);
                    }

                    else {
                        res.status(200);
                        res.end("Successfully added new");
                    }
                    

                });
            }

            else {
                res.status(200);
                res.end("exists"+doc);

            }
        });

    },

    add_tasks: (req, res) => {

        var tasks = new tasks_schema(req.body);
        console.log(req.body);
        tasks.save((err,result) => {
            if (err) {
                res.status(500)
                res.json("Failed to add" + err);
            }

            else {
                res.status(200);
                res.json(result);
            }

        });

    },

    addGroups: (req, res) => {
        console.log("nauman")


        tasks_schema.update({ _id: req.params.id }, { $push: { groups: req.body } }, { new: true }, (err, todo) => {

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("tasks does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    addMembers: (req, res) => {
        console.log("nauman")

        // tasks_schema.update(

        //     { $push: { members: 'ma,am' } }
        //  )


        tasks_schema.update({ _id: req.params.id }, { $push: { members: req.body } }, { new: true }, (err, todo) => {

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("tasks does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    update_tasks: (req, res, next) => {

        tasks_schema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
            console.log(req.body)

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("tasks does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    delete_tasks: (req, res, next) => {
        console.log(req.params)
        tasks_schema.findByIdAndRemove(req.params.id, (err, doc) => {

            if (err) {
                res.status(500);
                res.end("Failed to Delete");
            }

            if (!doc) {
                res.status(404);
                res.end("tasks does not exist");
            }

            else {
                res.status(200);
                res.end("Successfully deleted");
            }

        })

    },

    delete_tasksItem: (req, res, next) => {
        console.log(req.params)
        tasks_schema.findByIdAndRemove(req.params.id, (err, doc) => {

            if (err) {
                res.status(500);
                res.end("Failed to Delete");
            }

            if (!doc) {
                res.status(404);
                res.end("product does not exist");
            }

            else {
                res.status(200);
                res.end("Successfully deleted");
            }

        })
    },

    view_tasks: (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id.toString());
        console.log("query" + req.query.tasks)

        tasks_schema.find({
            'userID': id

        }).exec(function (err, doc) {

            if (err) {
                res.status("500");
                res.end("failed to view");
            }

            if (!doc) {
                res.status(404);
                res.send("No tasks exist");
            }

            else {
                res.status(200);
                res.json(doc);
            }
        });


    },

    view_all_tasks: (req, res, next) => {
        console.log("query" + req.query.id)
        tasks_schema.find({}).populate('consumers').exec(function (error, results) {
            if (error) {
                return next(error);
            }


            // Respond with valid data
            res.json(results);
        });


    },



    viewBytasks: (req, res) => {
        tasks_schema.aggregate([


            {
                $group: {
                    _id: "$name",
                    con: { $first: '$consumers' }



                }
            },




        ], function (error, results) {
            if (error) {
                return next(error);
            }

            console.log(results)

            // var stores=[]
            // for (let i = 0; i < results.length; i++) {

            //    stores.push(results[i]._id)
            // }
            // console.log("ethay"+stores)
            // order_schema.populate(stores, {path: "stores"} ,function(err,stores){
            //     console.log(stores)
            //     res
            //     .status(200)
            //     .json(stores);
            // }
            // )


            // Respond with valid data
            // res.json(results[0]._id);
        })
    },
    viewQty: (req, res, next) => {

        tasks_schema
            .aggregate([
                { $group: { _id: "$name", total: { $sum: "$quantity" } } }
            ])
            .exec(function (error, results) {
                if (error) {
                    return next(error);
                }


                // Respond with valid data
                res.json(results);
            });


    },




    login: (req, res, next) => {

        tasks_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err) {
                res.status(500);
                res.end("");
            }

            if (!result) {
                res.status(404);
                res.send("tasks does not exist");
            }

            else {
                res.status(200);
                res.send("tasks exist");
            }

        });

    }



}

module.exports = tasks_controller