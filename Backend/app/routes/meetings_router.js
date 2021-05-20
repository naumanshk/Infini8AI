var express = require('express');
var router = express.Router();


var meetingsController  =   require('../controllers/meetings')

router.get   ('/'             ,    meetingsController.view_all_meetings);
router.get   ('/test'             ,    meetingsController.test);
router.post   ('/addmem/:id'             ,    meetingsController.addMembers);
router.post   ('/addGroups/:id'             ,    meetingsController.addGroups);



router.get   ('/bygroup'             ,    meetingsController.viewBymeetings);


router.get   ('/qty'             ,    meetingsController.viewQty);

router.get   ('/:id'        ,    meetingsController.view_meetings    );

router.post  ('/add'          ,    meetingsController.add_meetings     );

router.put   ('/update/:id'   ,    meetingsController.update_meetings  );

router.delete('/delete/:id'   ,    meetingsController.delete_meetings  );

router.delete('/deleteCartItem/:id'   ,    meetingsController.delete_meetingsItem  );

router.post  ('/login'      ,      meetingsController.login           );



module.exports = router;
