var express = require('express');
var router = express.Router();


var tasksController  =   require('../controllers/tasks')

router.get   ('/'             ,    tasksController.view_all_tasks);
router.get   ('/test'             ,    tasksController.test);
router.post   ('/addmem/:id'             ,    tasksController.addMembers);
router.post   ('/addGroups/:id'             ,    tasksController.addGroups);



router.get   ('/bygroup'             ,    tasksController.viewBytasks);


router.get   ('/qty'             ,    tasksController.viewQty);

router.get   ('/:id'        ,    tasksController.view_tasks    );

router.post  ('/add'          ,    tasksController.add_tasks     );

router.put   ('/update/:id'   ,    tasksController.update_tasks  );

router.delete('/delete/:id'   ,    tasksController.delete_tasks  );

router.delete('/deleteCartItem/:id'   ,    tasksController.delete_tasksItem  );

router.post  ('/login'      ,      tasksController.login           );



module.exports = router;
