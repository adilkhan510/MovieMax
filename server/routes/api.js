const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const auth = require('../middleware/auth')

// ------show one user------

// show all users:: for showing purposes should use ROBO3T
router.get('/user', ctrl.getUserInfo)

router.post('/users/register', ctrl.register)
router.post('/users/login', ctrl.login)

// update



// Movie Routes 
router.post('/movies/favorites',ctrl.getFavorites);
router.post('/movies/addTofavorites',auth,ctrl.addToFavorites);




// review routes


module.exports = router;
