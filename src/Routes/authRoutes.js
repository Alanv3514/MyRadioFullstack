const {Router} = require('express');
const router = Router();
const {userController, programController, postController, frontController} = require('../Controller/index.js');
const authGuard = require('../Middleware/auth.js');


//Rutas de 'users'
router.get('/',authGuard('admin'), userController.getAll);
router.post('/register', userController.create);
router.post('/login', userController.login);


module.exports = router;