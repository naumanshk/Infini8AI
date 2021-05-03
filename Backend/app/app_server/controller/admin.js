var admin_schema = require('../models/admin')

var admin_controller = {
    add_admin: (req, res) => {
        console.log(req.body)

        var admin = new admin_schema(req.body);

        admin.save((err) => {
            if (err) {
                       res.status(500)
                       res.send("Failed to add"+err);rs
                     }

            else     {
                       res.status(200);
                       res.end("Successfully added");
                     }

        });

    },

    login: (req, res, next) => {

        admin_schema.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, result) {

            if (err)     {
                            res.status(500);
                            res.json(err);
                          }

            if (!result)  {
                              res.status(404);
                              res.send("category does not exist");
                          }

            else            {
                              res.status(200);
                              res.json({login:"success"});
                            }

        });

    }


}
module.exports = admin_controller