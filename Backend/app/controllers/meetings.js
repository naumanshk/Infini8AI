var meetings_schema = require('../models/meetings_model')
var mongoose = require('mongoose');

var meetings_controller = {

    test: (req, res) => {
        res.send("done")

    },

    add_meetingsNotExist: (req, res,next) => {

        // meetings_schema.find({ name: req.body.name }, function (error, result) {
        //     if (error) {
        //         res.status(500)
        //         res.json("Failed to add" + error);
        //     }

        //     else {

        //         res.status(200);
        //         res.end("Successfully added");
        //     }
        // });

        meetings_schema.find({
            'name': req.params.id

        }).exec(function (err, doc) {

            if (err) {
                res.status("500");
                res.end("failed to view");
            }

            if (doc.length==0 ) {
                res.status(200);
                var meetings = new meetings_schema(req.body);
          
                meetings.save((err) => {
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

    add_meetings: (req, res) => {

        var meetings = new meetings_schema(req.body);
        console.log(req.body);
        meetings.save((err,result) => {
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


        meetings_schema.update({ _id: req.params.id }, { $push: { groups: req.body } }, { new: true }, (err, todo) => {

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("meetings does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    addMembers: (req, res) => {
        console.log("nauman")

        // meetings_schema.update(

        //     { $push: { members: 'ma,am' } }
        //  )


        meetings_schema.update({ _id: req.params.id }, { $push: { members: req.body } }, { new: true }, (err, todo) => {

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("meetings does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    update_meetings: (req, res, next) => {

        meetings_schema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
            console.log(req.body)

            if (err) {
                res.status(500);
                res.end("Failed to Update");
            }

            if (!todo) {
                res.status(404)
                res.end("meetings does not exist")
            }

            else {
                res.status(200);
                res.json(todo);
            }

        })


    },

    delete_meetings: (req, res, next) => {
        console.log(req.params)
        meetings_schema.findByIdAndRemove(req.params.id, (err, doc) => {

            if (err) {
                res.status(500);
                res.end("Failed to Delete");
            }

            if (!doc) {
                res.status(404);
                res.end("meetings does not exist");
            }

            else {
                res.status(200);
                res.end("Successfully deleted");
            }

        })

    },

    delete_meetingsItem: (req, res, next) => {
        console.log(req.params)
        meetings_schema.findByIdAndRemove(req.params.id, (err, doc) => {

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

    view_meetings: (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id.toString());
        console.log("query" + req.query.meetings)

        meetings_schema.find({
            'userID': id

        }).exec(function (err, doc) {

            if (err) {
                res.status("500");
                res.end("failed to view");
            }

            if (!doc) {
                res.status(404);
                res.send("No meetings exist");
            }

            else {
                res.status(200);
                res.json(doc);
            }
        });


    },

    view_all_meetings: (req, res, next) => {
        console.log("query" + req.query.id)
        meetings_schema.find({}).populate('consumers').exec(function (error, results) {
            if (error) {
                return next(error);
            }


            // Respond with valid data
            res.json(results);
        });


    },



    viewBymeetings: (req, res) => {
        meetings_schema.aggregate([


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

        meetings_schema
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

        meetings_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err) {
                res.status(500);
                res.end("");
            }

            if (!result) {
                res.status(404);
                res.send("meetings does not exist");
            }

            else {
                res.status(200);
                res.send("meetings exist");
            }

        });

    }



}

module.exports = meetings_controller