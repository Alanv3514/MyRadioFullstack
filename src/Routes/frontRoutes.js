const express = require('express');
const router = express.Router();
const {frontController, userController} = require('../Controller/index.js');
const authGuard = require('../Middleware/auth.js');

// Rutas de Front
router.get('/', frontController.home);
router.get('/login', frontController.login);
router.get('/contactanos', frontController.contactUs);
router.get('/sobreNosotros', frontController.aboutUs);
router.get('/programas', frontController.programsList);
router.get('/detalles/:id', frontController.programCard);
router.get('/registrar', frontController.register);
router.get('/logout', frontController.logout);
router.get('/usersPanel', frontController.usersPanel);
router.get('/programsPanel', frontController.programPanel);
module.exports = router;
