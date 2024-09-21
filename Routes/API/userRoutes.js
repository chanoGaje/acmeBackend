const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/CRUD/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/:id')
    .get(usersController.getSingleUser)

module.exports = router