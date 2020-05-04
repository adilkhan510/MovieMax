const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// ------show one user------
router.get('/users/:id', ctrl.show)

// show all users:: for showing purposes should use ROBO3T
router.get('/users',ctrl.index)

router.get('/users/:id/favorites', ctrl.getFavorites);

// delete user

router.delete('/users/:id', ctrl.destroy);

// create User

router.post('/users/register', ctrl.register)
router.post('/users/login', ctrl.login)

// update
// restful routing process : put for updating and get for seeing so rely on that for making your routes.

router.put('/users/update/:userId', ctrl.update);
router.put('/users/update/:userId/addmovie', ctrl.addToFavorites);


// create movie
//show one movie
router.get('/movies',ctrl.show)


// review route

router.get('/review', ctrl.show)

router.delete('/review/delete/:id', ctrl.destroy)
router.put('/review/update/:id', ctrl.update)


module.exports = router;
