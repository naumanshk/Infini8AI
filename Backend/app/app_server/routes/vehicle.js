var express = require('express');
var router = express.Router();


var vehicleController  =   require('../controller/vehicle_controller')

router.get   ('/'             ,    vehicleController.view_all_vehicle);

router.get   ('/:name'        ,    vehicleController.view_vehicle    );

router.post  ('/add'          ,    vehicleController.add_vehicle     );

router.put   ('/update/:id'   ,    vehicleController.update_vehicle  );

router.delete('/delete/:id'   ,    vehicleController.delete_vehicle  );

router.post  ('/login'      ,      vehicleController.login           );



module.exports = router;
