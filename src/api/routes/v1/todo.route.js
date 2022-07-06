const express = require('express');
const controller = require('../../controllers/todo.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(authorize(), controller.list)
  .post(authorize(), controller.create);

router
  .route('/:id')
  .patch(authorize(), controller.update)
  .delete(authorize(), controller.delete);

module.exports = router;
