var Groups_schema = require('../models/groups')
var mongoose = require('mongoose');

var Groups_controller = {

    test: (req, res) => {
        res.send("done")

    },

    add_GroupsNotExist: (req, res) => {

        // Groups_schema.find({ name: req.body.name }, function (error, result) {
        //     if (error) {
        //         res.status(500)
        //         res.json("Failed to add" + error);
        //     }

        //     else {

        //         res.status(200);
        //         res.end("Successfully added");
        //     }
        // });

        Groups_schema.find({
            'name': req.params.id

        }).exec(function (err, doc) {

            if (err) {
                res.status("500");
                res.end("failed to view");
            }

            if (doc.length==0 ) {
                res.status(200);
                res.send("New Groups added ");
                var Groups = new Groups_schema(req.body.data);
          
                Groups.save((err) => {
                    if (err) {
                        res.status(500)
                        res.json("Failed to add new data" + err);
                    }

                    else {
                        res.status(200);
                        res.end("Successfully added new");
                    }

                });
            }

            else {
                res.status(200);
                res.json("exists"+doc);

            }
        });

    },

    add_Groups: (req, res) => {

        var Groups = new Groups_schema(req.body.data);
        console.log(req.body);
        Groups.save((err) => {
            if (err) {
                res.status(500)
                res.json("Failed to add" + err);
            }

            else {
                res.status(200);
                res.end("Successfully added");
            }

        });

    },

    addMembers: (req, res) => {
        console.log("nauman")

        // Groups_schema.update(

        //     { $push: { members: 'ma,am' } }
        //  )


        Groups_schema.update({ name: req.params.id }, { $push: { members: req.body.data } }, { new: true }, (err, todo) => {

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("Groups does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    update_Groups: (req, res, next) => {

        Groups_schema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("Groups does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    delete_Groups: (req, res, next) => {
        console.log(req.params)
        Groups_schema.findByIdAndRemove(req.params.id, (err, doc) => {

            if (err) {
                res.status(500);
                res.end("Failed to Delete");
            }

            if (!doc) {
                res.status(404);
                res.end("Groups does not exist");
            }

            else {
                res.status(200);
                res.end("Successfully deleted");
            }

        })

    },

    delete_GroupsItem: (req, res, next) => {
        console.log(req.params)
        Groups_schema.findByIdAndRemove(req.params.id, (err, doc) => {

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

    view_Groups: (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id.toString());
        console.log("query" + req.query.Groups)

        Groups_schema.find({
            'userID': id

        }).exec(function (err, doc) {

            if (err) {
                res.status("500");
                res.end("failed to view");
            }

            if (!doc) {
                res.status(404);
                res.send("No Groups exist");
            }

            else {
                res.status(200);
                res.json(doc);
            }
        });


    },

    view_all_Groups: (req, res, next) => {
        console.log("query" + req.query.id)
        Groups_schema.find({}).populate('consumers').exec(function (error, results) {
            if (error) {
                return next(error);
            }


            // Respond with valid data
            res.json(results);
        });


    },



    viewByGroups: (req, res) => {
        Groups_schema.aggregate([


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

        Groups_schema
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

        Groups_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err) {
                res.status(500);
                res.end("");
            }

            if (!result) {
                res.status(404);
                res.send("Groups does not exist");
            }

            else {
                res.status(200);
                res.send("Groups exist");
            }

        });

    }



}

module.exports = Groups_controller