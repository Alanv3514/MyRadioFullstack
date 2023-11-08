const {Router} = require('express');
const router = Router();
const {userController, programController} = require('../Controller/index.js');
const authGuard = require('../Middleware/auth.js');



// Rutas de 'programs'
router.get('/programs/',authGuard('user'), programController.getAll); // Leer todos los programas
router.get('/programs/:id',authGuard('user'), programController.getOne); // Leer un programa específico
router.post('/programs/',authGuard('admin'), programController.create); // Crear un nuevo programa
router.put('/programs/:id',authGuard('admin'), programController.update); // Actualizar un programa específico
router.delete('/programs/:id',authGuard('admin'), programController.delete); // Eliminar un programa específico


//Rutas de 'users'
router.get('/users/',authGuard('admin'), userController.getAll);
router.post('/users/register', userController.create);
router.post('/users/login', userController.login);
router.post('/register', userController.create);
router.post('/login', userController.login);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);


router.post('/mailer', userController.sendMail);




module.exports = router;
