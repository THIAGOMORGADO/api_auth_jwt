const { Router } = require('express');
const UserControllers = require('../controllers/UserControllers');

const router = Router();


router.get('/account', UserControllers.ShowAllUser);
router.post('/account', UserControllers.CreateUser);
router.put('/account/:id', UserControllers.UpdateUser);
router.delete('/account/:id', UserControllers.DeleteUser);


module.exports = router;