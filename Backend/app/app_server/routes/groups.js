var express = require('express');
var router = express.Router();


var GroupsController  =   require('../controller/groups')

router.get   ('/'             ,    GroupsController.view_all_Groups);
router.get   ('/test'             ,    GroupsController.test);
router.post   ('/addmem/:id'             ,    GroupsController.addMembers);


router.get   ('/bygroup'             ,    GroupsController.viewByGroups);


router.get   ('/qty'             ,    GroupsController.viewQty);

router.get   ('/:id'        ,    GroupsController.view_Groups    );

router.post  ('/add/:id'          ,    GroupsController.add_GroupsNotExist     );

router.put   ('/update/:id'   ,    GroupsController.update_Groups  );

router.delete('/delete/:id'   ,    GroupsController.delete_Groups  );

router.delete('/deleteCartItem/:id'   ,    GroupsController.delete_GroupsItem  );

router.post  ('/login'      ,      GroupsController.login           );



module.exports = router;
